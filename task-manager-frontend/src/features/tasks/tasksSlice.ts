import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Task } from "../../Types";
import { Loading, sortComparer } from "../../Constants";
import { 
    getTasks as getTasksFromAPI, 
    deleteTask as deleteTaskFromAPI,
    addTask as addTaskToAPI,
    editTask as editTaskInAPI,
    EditTaskParams,
    TaskPatchObject
} from "../../api/APIService";

import { deleteCategory } from "../categories/categoriesSlice";

// For tasks reducer and async logic

const tasksAdapter = createEntityAdapter<Task>({
    sortComparer
});

export const getTasks = createAsyncThunk('tasks/getTasks', async() => {
    return getTasksFromAPI();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(id:number) => {
    return deleteTaskFromAPI(id);
});

// TODO: find out how to re-use members of one type in another
export type TaskPostArg = {
    category_id:number;
    name: string;
    description?: string | null;
    due_date?:string | null 
    priority?: string | null
}

// params is task id, body is task related information
export type EditTaskArg = {
    params: EditTaskParams,
    body: TaskPatchObject
}

export const editTask = createAsyncThunk('tasks/editTask', async(arg: EditTaskArg) => {
    return editTaskInAPI(arg.params, arg.body);
});

export const addTask = createAsyncThunk('tasks/addTask', async(arg: TaskPostArg) => {
    const {category_id, ...body} = arg;
    return addTaskToAPI(category_id, body);
});

// For local selectors that operate on state.tasks only.
// Selectors at the bottom of the file operate on root state instead, to use in useAppSelector
const { selectAll:selectAllTasksLocal } = tasksAdapter.getSelectors();

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState({
        status: Loading.IDLE
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
            state.status = Loading.PENDING;
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state.status = Loading.FULFILLED;
            tasksAdapter.upsertMany(state, action.payload);
        })
        .addCase(getTasks.rejected, (state) => {
            state.status = Loading.REJECTED
        })
        .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
        .addCase(addTask.fulfilled, tasksAdapter.addOne)
        .addCase(editTask.fulfilled, (state, action) => {
            const { id, ...changes } = action.payload;
            // updateOne expects Update<Task> which is obj = { id, changes }
            const update = {
                id,
                changes
            };

            tasksAdapter.updateOne(state, update);
        })
        // to handle deleting tasks in a category when a category is deleted
        .addCase(deleteCategory.fulfilled, (state, action) => {
            const { id: idDeleted } = action.payload;
            const tasks = selectAllTasksLocal(state);

            // remove tasks with category id same as that of category just deleted
            const tasksToDelete = tasks
                .filter((task) => task.category_id == idDeleted)
                .map((task) => task.id);

            // removeMany expects ids of tasks to remove
            tasksAdapter.removeMany(state, tasksToDelete);
        });
    }
})

export default tasksSlice.reducer;


// Root state selectors
export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
} = tasksAdapter.getSelectors((state:RootState) => state.tasks)

export const selectTasksStatus = (state:RootState) => state.tasks.status;

export const selectFilteredTasks = (state:RootState, filterFn:(task:Task) => boolean) => {
    const tasks = selectAllTasks(state);
    return tasks.filter(filterFn);
}

// input: searchValue as string
// output: function that takes a Task and returns true if we want to include it, false if exclude
// filter by case-insensitive match with name or description
export function makeTaskFilter(searchValue: string): (task:Task) => boolean {
    const value: string = searchValue.trim().toLowerCase();

    function taskFilter(task: Task) {
        if (value != '') {
            const name: string = task.name || '';
            const desc: string = task.description || '';

            return name.toLowerCase().includes(value) || 
                desc.toLowerCase().includes(value);
        }

        return true;
    }

    return taskFilter;
}

export const errorTask = ():Task => {
    return {
        id: -1,
        name: "Error",
        description: "",
        due_date: "",
        priority: "",
        category_id: -1,
        created_at: "",
        updated_at: "",
    }
    
}