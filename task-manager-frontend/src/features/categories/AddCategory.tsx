import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons'
import { useFormik } from 'formik';
import { useCategoryYup } from './Validation';
import { addNewCategory, getCategories } from './categoriesSlice';
import { useAppDispatch } from '../../app/hooks';
import { useNavigateHelper } from '../../urlHelper';

// Button and modal for Add Category
function AddCategory() {
    const [show, setShow] = useState<boolean>(false);
    // modal backdrop=true keyboard=true, closeButton=true, other closable btns disabled = false when modal is closable
    // not closable: invert above properties, backdrop="static"
    const [canClose, setCanClose] = useState<boolean>(true);
    
    const dispatch = useAppDispatch();

    const handleShow = () => { dispatch(getCategories()); setShow(true); };

    const navigate = useNavigateHelper();
    // TODO: find a way to re-use modal logic
    const validation = useCategoryYup();
    // I can have a submit button outside the form by setting button form prop to id, and form id to id
    // This does not work on IE11: https://stackoverflow.com/questions/49525057/react-formik-use-submitform-outside-formik
    const id = "add-category-form";

    // useFormik instead of Formik component so I can access resetForm in handleClose
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: async (values, {resetForm}) => {
            setCanClose(false);
            const newCat = await dispatch(addNewCategory(values.name)).unwrap();
            setCanClose(true);
            resetForm();
            handleClose();
            navigate(newCat.id);

        },
        validationSchema: validation
    });

    const { handleSubmit, touched, errors, resetForm } = formik;

    // because form needs to be reset no matter how the modal is closed, makes it hard to separate modal and form
    // into re-usable components
    const handleClose = () => { resetForm(); setShow(false); };
    

    return (
        <>
            <Button variant="secondary" className="mx-2 mt-3 d-flex justify-content-center align-items-center"
            onClick={handleShow}>
                <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
                <span className="lead">Add Category</span>
            </Button>

            <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
                <Modal.Header closeButton={canClose}>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body> 
                    <Form id={id} noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group>
                                <Form.Label>Name: </Form.Label>
                                <Form.Control
                                    type="text"
                                    isValid={touched.name && !errors.name}
                                    isInvalid={!!errors.name}
                                    // this passes in: value, name, onChange, onBlur
                                    {...formik.getFieldProps("name")}
                                />
                                <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={!canClose} form={id}> Add category </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCategory;