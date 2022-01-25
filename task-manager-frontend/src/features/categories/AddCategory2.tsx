// Failed attempt #1 at re-using custom modal logic with useModal

// import React, { useState } from 'react';
// import { Button, Form, Modal, Row } from 'react-bootstrap';
// import { PlusLg } from 'react-bootstrap-icons'
// import { useFormik } from 'formik';

// import useYup from './Validation';

// import { addNewCategory, selectAllCategories } from './categoriesSlice';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import useModal from '../common/useModal';

// interface ModalFormProps {
//     show: any;
//     setShow:any;
//     canClose: any;
//     setCanClose:any;
// }
// function useForm(show:any, setShow:any, canClose:any, setCanClose:any, formId: string) {
//     // const { show, setShow, canClose, setCanClose } = props;
//     const dispatch = useAppDispatch();

//     const yup:any = useYup();
//     const validation = yup.object({
//         name: yup.string().required("Category name can't be blank").isValidCategory()
//     });

//     // I can have a submit button outside the form by setting button form prop to id, and form id to id
//     // This does not work on IE11: https://stackoverflow.com/questions/49525057/react-formik-use-submitform-outside-formik
//     const id = "add-category-form";

//     // useFormik instead of Formik component so I can access resetForm in handleClose
//     const formik = useFormik({
//         initialValues: {
//             name: ''
//         },
//         onSubmit: async (values, {resetForm}) => {
//             console.log(JSON.stringify(values));
//             setCanClose(false);
//             await dispatch(addNewCategory(values.name));
//             setCanClose(true);
//             resetForm();
//             handleClose();
//         },
//         validationSchema: validation
//     });

//     const { handleSubmit, handleChange, handleBlur, values, touched, errors, resetForm } = formik;

//     const handleClose = () => { resetForm(); setShow(false); }

//     const form = () => (<Form id={id} noValidate onSubmit={handleSubmit}>
//         <Row>
//             <Form.Group>
//                 <Form.Label>Name: </Form.Label>
//                 <Form.Control
//                     type="text"
//                     isValid={touched.name && !errors.name}
//                     isInvalid={!!errors.name}
//                     // this passes in: value, name, onChange, onBlur
//                     {...formik.getFieldProps("name")}
//                 />
//                 <Form.Control.Feedback>Looks good</Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
//             </Form.Group>
//         </Row>
//     </Form>);

//     return {
//         handleClose,
//         ModalForm: form
//     }
// }

// function AddCategory2() {
//     const { CustomModal, show, canClose, setShow, setCanClose } = useModal();
//     const title = "Add Category";
//     const formId = "add-category-form"

//     const { handleClose, ModalForm } = useForm(show, setShow, canClose, setCanClose, formId);

//     const handleShow = () => setShow(true);

//     const body = <ModalForm />;

//     const footer = (
//         <>
//             <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
//             <Button variant="primary" type="submit" disabled={!canClose} form={formId}> Add category </Button>
//         </>
//     );

//     const Modal = () =>  {
//         return <CustomModal title={title} body={body} footer={footer} />
//     };

//     return (
//         <>
//             <Button variant="secondary" className="mx-2 mt-4 d-flex justify-content-center align-items-center"
//                 onClick={handleShow}>
//                     <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
//                     <span className="lead">Add Category</span>
//             </Button>
//             <Modal/>
//         </>
//     )

// }

// export default AddCategory2;
export {}
