import { useFormik } from 'formik';
import React, { useState } from 'react';
import { editCategory, getCategories } from '../categories/categoriesSlice';
import { useAppDispatch } from '../../app/hooks';
import { useCategoryYup } from './Validation';
import { Button, Modal, Form, Row } from 'react-bootstrap';
import { Category } from '../../Types';
import { updateCategoryArgsOf } from './updateCategory';

function RenameCategory({ category }: { category: Category }) { 
    const [show, setShow] = useState<boolean>(false);
    // modal backdrop=true keyboard=true, closeButton=true, other closable btns disabled = false when modal is closable
    // not closable: invert above properties, backdrop="static"
    const [canClose, setCanClose] = useState<boolean>(true);
    
    const dispatch = useAppDispatch();

    // get categories to prevent naming conflict in case updated in different tab
    // not essential to block editing, async dispatch is usually fast enough
    const handleShow = () => { dispatch(getCategories()); setShow(true); };

    const validation = useCategoryYup(); // re-use Yup object from Add Category

    // I can have a submit button outside the form by setting button form prop to id, and form id to id
    // This does not work on IE11: https://stackoverflow.com/questions/49525057/react-formik-use-submitform-outside-formik
    const id = "add-category-form";

    // useFormik instead of Formik component so I can access resetForm in handleClose
    // TODO: after add category, navigate to the new category and set the active nav somehow
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: async (values, {resetForm}) => {
            setCanClose(false);
            const editArg = updateCategoryArgsOf(category, values);
            await dispatch(editCategory(editArg));
            setCanClose(true);
            resetForm();
            handleClose();
        },
        validationSchema: validation,
    });

    const { handleSubmit, touched, errors, resetForm } = formik;

    const handleClose = () => { resetForm(); setShow(false); };
    

    return (
        <>
        <Button variant="primary mx-4" onClick={handleShow}> Rename </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Rename category: {category.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body> 
                <Form id={id} noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group>
                            <Form.Label>New name: </Form.Label>
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
                <Button variant="primary" type="submit" disabled={!canClose} form={id}> Rename category </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default RenameCategory;