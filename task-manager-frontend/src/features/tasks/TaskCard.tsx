import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Task } from '../../Types';
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress, Tooltip } from '@mui/material';
import { deleteTask } from './tasksSlice';
import { useAppDispatch } from '../../app/hooks';
import { DueDateStr } from '../common/dateObjects';
import EditTaskButton from './EditTaskButton';
import CategoryLink from './CategoryLink';


import './TaskCard.css'


type DescProps = {
    desc: string
}

type DueDateProps = {
    dueDate: string | undefined
}

function Description({ desc }: DescProps) {
    return ( 
        <Card.Text>
            { desc }
        </Card.Text>
    );
};

function EmptyDescription() {
    return <Card.Text className="text-muted m-0">No description</Card.Text>
};

// display correct description component based on desc empty or not
function DisplayDescription({ desc }:DescProps) {
    return desc ? < Description desc={desc}/> : <EmptyDescription/>
}

// to handle showing the due date in a card text.
// DueDateStr handles displaying the date string with appropriate formatting
function DueDate(props: { dueDate: string }) {
    const { dueDate } = props;

    return (
        <Card.Text>
            <DueDateStr dateStr={dueDate}/>
        </Card.Text>
    );
}

// takes in a due date that might be undefined and returns the correct component to show
// due date might be undefined/empty, ternary also acts as a type guard
function DisplayDueDate({ dueDate }: DueDateProps) {
    return dueDate ? <DueDate dueDate={dueDate} /> : <p className="text-muted">No due date</p>;
}

// Component to display an individual task along with delete (checkbox) and edit buttons
// if showCategory is true, show a link to the task category as well which redirects to resp. cat page
type TaskCardProps = { task:Task, showCategory?:boolean }
function TaskCard({ task, showCategory }:TaskCardProps) {
    const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const checkboxDelete = async () => {
        setButtonsDisabled(true);
        await dispatch(deleteTask(task.id));
    }

    return (
        <div>
            <Card className= "mb-3 p-1 border border-dark hover-effect">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Card.Title className="d-flex align-items-center"> 
                                
                                <Tooltip title="Complete task" placement="top-start">
                                    {/* Checkbox default creates extra unecc. space, set w,h to 0 to take it out */}
                                    {/* Show progress spinner (MUI) instead if doing deletion */}
                                    { buttonsDisabled ? <CircularProgress size={20} sx={{marginRight: "0.6rem"}}/> : 
                                        <Checkbox onClick={checkboxDelete} disabled={buttonsDisabled}
                                            sx={{width:0, height:0, marginRight: "0.7rem"}}
                                         /> }

                                </Tooltip>
                                <span> {task.name} </span>
                            </Card.Title>

                            <DisplayDescription desc={task.description}/>
                        </Col>

                        <Col md={6} className="d-flex align-items-start flex-column justify-content-center">
                            <DisplayDueDate dueDate={task.due_date}/>
                            <div>
                                <EditTaskButton disabled={buttonsDisabled} task={task}/>
                                { showCategory ? <CategoryLink id={task.category_id}/> : '' }
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard;