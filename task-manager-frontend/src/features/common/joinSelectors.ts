// Selectors that need to bring both tasks and categories together (like a JOIN table)
// Sep. file to avoid circular dep.

import { RootState } from "../../app/store";
import { Task } from "../../Types";
import { selectAllTasks } from "../tasks/tasksSlice";

// select tasks that have a specified category id (tasks in a category)
export const selectTasksByCategory = (state:RootState, id:string | number): Task[]=> {
    return selectAllTasks(state)
            .filter((task) => task.category_id == id);
}

// get array of task IDs that have the specified category id
export const selectTaskIdsByCategory = (state:RootState, catId: string | number): number[] => {
    return selectTasksByCategory(state, catId)
    .map(task => task.id);
}