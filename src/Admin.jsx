import { useSearchParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react'

function Admin() {
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = searchParams.get('auth');


    const [show, setShow] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!auth) {
            handleShow();

             const timeout = setTimeout(() => {
                setRedirect(true);
            }, 2500);
            
        }
    }, [auth]);

    return (
        <>
            {auth ? <h2>Bienvenido, administrador</h2>
                :
                redirect  &&
                <Navigate to="/login" replace />
            }

            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Acceso denegado</Modal.Title>
                </Modal.Header>
                <Modal.Body>Por favor, introduzca sus credenciales</Modal.Body>
            </Modal>

        </>
    )
}

export default Admin
