import React from "react"
import { useAppSelector } from "../app/hooks";
import { Loading } from "../Constants";
import useSortBy from "../features/common/useSortBy";
import { dateISOToDateDisplay } from "../features/common/dateObjects";
import { StandardSpin } from "../features/common/Spinners";
import TasksList from "../features/tasks/TasksList";
import { sortByDueDate } from "../features/tasks/taskSorter";
import { selectTasksStatus } from "../features/tasks/tasksSlice";
import { Task } from "../Types"


// pass in date string to display and filtered tasks array to use for TasksList
// pre filter tasks to avoid unnecc. repeated filtering
// put in same file since main use is with UpcomingList and is not very big
function UpcomingCard(props: { dateDisplay:string, tasks: Task[]}) {
    const { dateDisplay, tasks } = props;
    const { sortOption, SortByButton } = useSortBy();


    return (
        <div>
            <div className="d-flex align-items-center">
                <h3 className="fs-4">{dateDisplay}</h3>
                <SortByButton />
            </div>
            
            <hr></hr>
            <TasksList tasks={tasks} showCategory showSearch sortBy={sortOption}/>
            <div className="mb-5"></div>
        </div>
    );
}

// input: non-empty task array where all tasks have due_date
// output: object with key as date display string, value as array of tasks with that date
// put in same file since main use with UpcomingList
type TaskGroupByDate = Record<string, Task[]>;
function groupTasksByDueDate(tasks: Task[]): TaskGroupByDate {
    // sort by due date at first so that order maintained during groupBy
    // map is to prevent unintended effects of mutating original arg
    tasks = tasks.map(x => x).sort(sortByDueDate);

    return tasks.reduce((acc:TaskGroupByDate, curr:Task) => {
        let key = curr.due_date;
        // convert to date display str to get tasks with same date regardless of time
        // use it directly for displaying, no extra conversion req.
        key = key ? dateISOToDateDisplay(key) : undefined;
        if (key == undefined) { return acc; } // return immediately in case faulty due date

        // if key exists push curr task onto array
        if (key in acc) {
            acc[key].push(curr);
        
        // doesn't exist: make new array with curr task
        } else {
            acc[key] = [curr];
        }

        return acc;

    }, {});
}

// pass in array of tasks to filter (enables re-use if needed)
function UpcomingList({ tasks }: { tasks: Task[] }) {
    const tasksWithDueDate:Task[] = tasks.filter(t => t.due_date != null);
    const taskStatus = useAppSelector(selectTasksStatus);


    const groupToCards = () => {
        const group = groupTasksByDueDate(tasksWithDueDate);

        return Object.keys(group).map((key) => 
            <UpcomingCard key={key} dateDisplay={key} tasks={group[key]} />
        );
    }

    if (tasksWithDueDate.length !== 0) {
        return <> { groupToCards() } </>;
    } else {
        switch (taskStatus) {
            case Loading.FULFILLED:
                return (
                    <> 
                        <hr></hr>
                        <p className="lead"> No tasks with a due date. </p>
                    </>
                );
            case Loading.REJECTED:
                return <p className="text-danger lead"> Error loading tasks </p>;
            default:
                return <StandardSpin />;
        }
    }
}

export default UpcomingList;