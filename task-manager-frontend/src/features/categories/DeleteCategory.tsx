import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { useAppDispatch } from '../../app/hooks';
import { Category } from '../../Types';
import { deleteCategory } from './categoriesSlice';
import { useNavigateHelper, CATEGORIES_PATH } from '../../urlHelper';

type DeleteCategoryProps = {
    category: Category
}

// Modal and button for Delete category 
function DeleteCategory({ category }: DeleteCategoryProps) {
    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const navigate = useNavigateHelper();

    const handleDelete = async () => {
        setCanClose(false); // while dispatching API req, can't close the modal or re-submit
        await dispatch(deleteCategory({ categoryId: category.id }))
        setCanClose(true);
        handleClose();
        // navigate to /categories after delete is done (Welcome, please select/create a category)
        navigate(CATEGORIES_PATH);
    }

    return (
        <>
        <Button variant="danger" onClick={handleShow}> Delete </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Delete category: {category.name} </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-danger"> 
                <span className="lead">Are you sure? This will delete all tasks in <b>{category.name}</b> </span>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="danger" type="submit" disabled={!canClose} onClick={handleDelete}> Delete category </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default DeleteCategory;