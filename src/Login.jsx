import { useState } from 'react';
import { Button, Modal, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from "react-router-dom";

import usuarios from './data/usuarios';


function Login() {

    const [mensError, setMensError] = useState("Usuario o contraseña incorrectos");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const defaultUser = {
        user: "",
        password: ""
    }


    const [user, setUser] = useState(defaultUser)

    const navigate = useNavigate();



    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm();
        console.log("ENVIANDO FORM", user)
    }


    const handleChange = (event) => {
        const valor = event.target.value;
        const campo = event.target.name;
        const nuevoUser = { ...user }
        nuevoUser[campo] = valor
        setUser(nuevoUser)
    }

    function validateForm() {

        let checkUser = usuarios.filter((valUser) => user.user == valUser.user)

        if(checkUser.length <1){ //if (user.user != validUser.user)
            setMensError("El usuario no es válido");
            handleShow();
        }else if(checkUser[0].password != user.password){ // else if (user.password != validUser.password) {
            setMensError("La contraseña no es válida");
            handleShow();
        } else {
            if(user.user == 'admin'){
                navigate("/admin?auth=true", { replace: true });
            }else{
                navigate("/perfil?id="+checkUser[0].id, { replace: true });
            }
        }

    }

    return (
        <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} sm={12} md={6} lg={6} controlId="validationCustomUsername">
                        <Form.Label>Usuario</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={user.name}
                                onChange={handleChange}
                                name="user"
                            />
                        </InputGroup>
                    </Form.Group>


                    <Form.Group as={Col} sm={12} md={6} lg={6} controlId="validationCustom01">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.password}
                            onChange={handleChange}
                            name="password"
                            required
                        />
                    </Form.Group>

                </Row>


                <Button type="submit" >Submit form</Button>

                <Modal show={show} onHide={() => handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{mensError} </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleClose()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Form>

        </>
    )
}

export default Login