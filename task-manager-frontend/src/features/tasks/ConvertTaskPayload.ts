// File for functions used in receiving raw inputs from form and converting into data 
// ready for POST to server
// to use in Add Task and Edit Task
import { TaskEditProps, TaskValidationProps } from "./Validation" // input format from form
import { generate12AMDateFromDateStr,dateTimeInputsToDate } from "../common/dateObjects"
import { TaskPostObject, TaskPatchObject} from "../../api/APIService"
import { EditTaskArg } from "./tasksSlice";
import { Task } from "../../Types";


// assumptions:
// title, desc, date, time. TRIM ALL FORM INPUTS BEFORE POSTING
    // title: non-empty
    // desc: may or may not be empty
    // date: empty | valid according to DATE_PICKER_FORMAT
    // time empty | valid according to TIME_PICKER_FORMAT


// for operations on all inputs e.g trim. return object with same structure
function convertAll(obj: TaskValidationProps):TaskValidationProps {
    let newObj:any = {};

    function convertOne(data:any) {
        if (typeof data === 'string') {
            return data.trim();
        }
        return data;
    }

    for (const [key,val] of Object.entries(obj)) {
        const newVal = convertOne(val);
        newObj[key] = newVal;
    }

    return newObj;
}

// Individual run AFTER TRIM
// for now return title as is
function convertTitle(title: string):string {
    return title;
}

// if description is empty return null so it is not set at all in backend
// change to empty if null POST doesn't work
function convertDescription(description:string):string | null {
    return description ? description : null;
}

// convert date and timeinto due_date ISO string OR null !important
// if date empty, time must be empty (according to Validation.ts) so use null
// if date not empty:
    // time empty: set time of date to 12am using parse 
    // time not empty: parse string as normal using date and time
function convertToDueDate(dateStr:string, timeStr:string):string | null {
    let dueDate = null;

    if (dateStr) {
        if (!timeStr) {
            dueDate = generate12AMDateFromDateStr(dateStr);
        } else {
            dueDate = dateTimeInputsToDate(dateStr, timeStr);
        }

        dueDate = dueDate.toISOString(); // !important
    }

    return dueDate;
}

// function that takes task form values obj, converts to object ready for posting to server
// for /POST (create task)
export function convertTaskFormToPostObject(obj: TaskValidationProps):TaskPostObject {
    obj = convertAll(obj);

    return {
        name: convertTitle(obj.title),
        description: convertDescription(obj.description),
        due_date: convertToDueDate(obj.date, obj.time)
    };
}

// input: Task obj and values as TaskValidationProps
// output: object formatted for passing into async thunk dispatch
export function convertTaskValuesForEdit(task: Task, values: TaskEditProps): EditTaskArg {
    let body = convertTaskFormToPostObject(values);
    let newBody: TaskPatchObject = { ...body, category_id: Number(values.categoryId)}
    const params = { categoryId: task.category_id, taskId: task.id};
    return {
        params,
        body: newBody
    }
}
