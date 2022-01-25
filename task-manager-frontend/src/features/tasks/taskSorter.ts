// A-Z, Z-A, Newest first, Oldest first, Due date (most urgent)
// For sorting related logic and constants. Sort by button uses option names to display drop down.
import { Task } from '../../Types';

type TaskSorter = (a: Task, b:Task) => number

// sort functions that can be passed into array.sort
const sortByAlphaAsc:TaskSorter = (a,b) => {
    return a.name.localeCompare(b.name);
}

const sortByAlphaDesc:TaskSorter = (a,b) => {
    return -1 * sortByAlphaAsc(a, b);
}

// newest/oldest by updated_at - so that if I update a task it comes to the top 
const sortByNewestFirst:TaskSorter = (a,b) => {
    return -1 * sortByOldestFirst(a, b);
}

const sortByOldestFirst:TaskSorter = (a,b) => {
    return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
    
}

// most urgent (smallest date first)
// due date is optional: cases
// a,b both no due date: use default order (alpha or newest first)
// a due, b no due: a comes first
// a no due, b due: b comes first
// a,b both have due: compare date, earlier comes first
export const sortByDueDate:TaskSorter = (a,b) => {
    const aDue = a.due_date;
    const bDue = b.due_date;

    if (aDue && bDue) {
        return new Date(aDue).getTime() - new Date(bDue).getTime();
    }

    else if (aDue && !bDue) {
        return -1;
    }

    else if (!aDue && bDue) {
        return 1;
    }
    return 0; // keep original order if both no due date
}

// easy to add new sort option: just make new key and function
const SORT_OPTIONS: Record<string, TaskSorter> = {
    "A-Z": sortByAlphaAsc,
    "Z-A": sortByAlphaDesc,
    "Newest first": sortByNewestFirst,
    "Oldest first": sortByOldestFirst,
    "Due date": sortByDueDate
}

export const OPTION_NAMES = Object.keys(SORT_OPTIONS);

export const DEFAULT_OPTION = OPTION_NAMES[2];

export const sortTasks = (tasks: Task[], sortBy: string | undefined | null):Task[] => {
    sortBy = sortBy || DEFAULT_OPTION;
    const sorter = SORT_OPTIONS[sortBy];
    return tasks.map((task) => task).sort(sorter);
} 
