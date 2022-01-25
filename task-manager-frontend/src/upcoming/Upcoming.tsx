import React from 'react';
import { useAppSelector } from '../app/hooks';
import TasksList from '../features/tasks/TasksList';
import { selectAllTasks } from '../features/tasks/tasksSlice';
import Spacer from '../Spacer';
import UpcomingList from './UpcomingList';


// Component to display for Upcoming page (presentational)
function Upcoming() {
    const tasks = useAppSelector(selectAllTasks);
    return (
        <div>
            <h2 className="lead fs-2">Upcoming</h2> 
            <p className="text-muted mx-1 fs-6">Only tasks with a due date appear here </p>
            <div className="mt-4"></div>
     

            <UpcomingList tasks={tasks} />

        </div>
    );
}

export default Upcoming;