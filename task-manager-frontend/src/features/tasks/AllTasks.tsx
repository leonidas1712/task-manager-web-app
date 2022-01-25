import React, {useState} from 'react';
import { useAppSelector } from '../../app/hooks';
import useSortBy from '../common/useSortBy';
import TasksList from './TasksList';
import { selectAllTasks, selectTasksStatus, selectFilteredTasks } from './tasksSlice';
import { StandardSpin } from '../common/Spinners';
import { Loading } from '../../Constants';
import SearchBar from '../common/SearchBar';

// Component for displaying all tasks across categories
function AllTasks() {
    const tasks = useAppSelector(selectAllTasks);
    const status = useAppSelector(selectTasksStatus); 
    
    const { sortOption, SortByButton } = useSortBy();


    // handle loading status if no tasks (no tasks could be because actually 0 tasks, still loading or error)
    const displayTasks = () => {
        if (tasks.length == 0) {
            switch (status) {
                case Loading.PENDING:
                    return <StandardSpin />;
                case Loading.IDLE:
                case Loading.FULFILLED:
                    return  <p className="lead">No tasks to show. Well done!</p>;
                case Loading.REJECTED:
                    return <p className="lead text-danger">Error loading tasks</p>

            }
        }

        return <TasksList tasks={tasks} showCategory showSearch sortBy={sortOption}/>;        
    }

    

    return (
        <div>
            <div className="d-flex align-items-center">
                <h2 className="lead fs-2 mr-5">All tasks</h2> 
                <div className="mx-5"><SortByButton /></div>  
            </div>

            <hr></hr>

            { displayTasks() }
        </div>

    )
}

export default AllTasks;