// Wrapper around bootstrap modal to enable re-use with render props
// Failed attempt #2 at moving modal logic separate
// Problem: formik form relies on modal methods like setShow, setCanClose, but modal relies on resetForm running
// everytime handleClose runs. Circular dependency, possible when putting everything together but difficult to
// separate into components.

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

type ModalState = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    canClose: boolean;
    setCanClose: React.Dispatch<React.SetStateAction<boolean>>;
}

// type needed for onHide function
type HandleClose = () => void | undefined;

type CustomModalProps = {
    title: (m: ModalState) => any;
    body: (m: ModalState) => any;
    footer: (m: ModalState) => any;
    handleCloseMaker?: (m:ModalState) => HandleClose; // take in modal state, return handleClose function for use
}


function CustomModal(props: CustomModalProps) {
    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);

    const modalState:ModalState = {
        show,
        setShow,
        canClose,
        setCanClose
    };

    const handleClose = props.handleCloseMaker ? props.handleCloseMaker(modalState) : () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body> 
                {props.body}
            </Modal.Body>

            <Modal.Footer>
                {props.footer}
            </Modal.Footer>
        </Modal>
    )
}

export {}