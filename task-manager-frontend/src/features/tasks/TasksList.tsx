import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Task } from '../../Types';
import { selectTasksByCategory } from '../common/joinSelectors';
import SearchBar from '../common/SearchBar';
import TaskCard from './TaskCard';
import { sortTasks } from './taskSorter';
import { makeTaskFilter } from './tasksSlice';

// take in array of tasks to enable re-use in upcoming page
type TaskListProps = {
    tasks: Task[],
    sortBy?: string | undefined,
    showCategory?: boolean | undefined,
    showSearch?:boolean | undefined
}

// Display tasks passed in with TaskCard. sortBy defines sort order, use default if not available
// showSearch if true shows search bar. Decided to put showSearch into TasksList instead of in respective components
// as it is easier to keep the bar with the list than separate like sort by button (both in terms of styling, logic)
function TasksList(props: TaskListProps) {
    const { tasks, sortBy, showCategory, showSearch } = props;
    const [value, setValue] = useState<string>("");

    // filter then sort
    const filteredTasks = tasks.filter(makeTaskFilter(value));
    // create new array to avoid unwanted mutation (JS sort is in place)
    const sortedTasks = sortTasks(filteredTasks, sortBy);    

    const showTasks = (tasks:Task[]) => {
        return tasks.length == 0 ? <p className="lead">No tasks to show</p> : 
            tasks.map((task) => <TaskCard key={task.id} task={task} showCategory={showCategory ? true : false} />)
    }


    return (
        <div>
            { showSearch ? <SearchBar handleSearchValue={(val:string) => setValue(val)}/> : ''}
            <div className="mt-3"></div>
            { showTasks(sortedTasks) }
        </div>
    )
}


export default TasksList;