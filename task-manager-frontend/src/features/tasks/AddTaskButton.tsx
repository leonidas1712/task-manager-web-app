import React, { useState } from 'react';
import { Button, Modal, Form, Row, FloatingLabel } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import { useAppDispatch } from '../../app/hooks';
import * as yup from 'yup';
import { useFormik } from 'formik';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { TaskValidationProps, validateTaskFields } from './Validation';
import { convertTaskFormToPostObject } from './ConvertTaskPayload';
import { addTask, TaskPostArg } from './tasksSlice';

// props: category id to automatically set
type AddTaskButtonProps = {
    categoryId: number
}

// Button and modal-form for add task
function AddTaskButton({ categoryId }: AddTaskButtonProps) {
    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);
    const id = "add-task-form";
    
    
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true);


    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            time: ''
        },
        
        onSubmit: async (values:TaskValidationProps, {resetForm}) => {
            setCanClose(false);
            // convert values from form into sub-object for dispatch
            const postObj = convertTaskFormToPostObject(values)
            // need to add categoryId since it does not come with Add Task form values
            const taskPostArg:TaskPostArg = {category_id: categoryId, ...postObj};
            await dispatch(addTask(taskPostArg));
            setCanClose(true);
            handleClose();
        },
        validate: validateTaskFields // re-use same validation for edit and add task 
    });

    const { handleSubmit, touched, errors, resetForm } = formik;

    const handleClose = () => { resetForm(); setShow(false); };


    return (
        <div>
        <Button 
            variant="secondary" 
            className="mx-0 mt-2 mb-3 d-flex justify-content-center align-items-center"
            onClick ={() => handleShow()}
        >
            <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
            <span style={{fontSize: "1.1rem"}}>Add Task </span>
        </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>

            <Modal.Body> 
                <Form id={id} noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                type="text"
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                // this passes in: value, name, onChange, onBlur
                                {...formik.getFieldProps("title")}
                            />
                            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="This is optional"
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                {...formik.getFieldProps("description")}
                            />
                            
                            <Form.Control.Feedback></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Date<span className="text-muted">(optional):</span></Form.Label>
                            <Form.Control type="date" {...formik.getFieldProps("date")} 
                                isValid={touched.date && !errors.date }
                                isInvalid={!!errors.date}
                            />
                            <Form.Control.Feedback>Note: incomplete dates are ignored</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Firefox has no dropdown for picking the time  */}
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Time<span className="text-muted">(e.g 08:10am)</span> </Form.Label>
                            <Form.Control type="time"
                                isValid={touched.time && !errors.time}
                                isInvalid={!!errors.time}
                                {...formik.getFieldProps("time")}
                            />
                            <Form.Control.Feedback>Note: incomplete times are ignored</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={!canClose} form={id}> Add task </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export default AddTaskButton;