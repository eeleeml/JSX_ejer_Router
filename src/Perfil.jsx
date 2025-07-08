import { useSearchParams, Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { Button, Modal, Form, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react'


import cursos from './data/cursos.js';


import { LanguageContext, LanguageProvider, traducciones } from './context/LanguageContext.jsx'
import { ThemeContext, ThemeProvider, modos } from './context/ThemeContext.jsx'
import { UserContext, UserProvider } from './context/UserContext.jsx'

function Perfil() {
    const { getTranslation, setNewLanguage, getLanguage } = useContext(LanguageContext);
    const { getModo, setNewTheme, getTheme } = useContext(ThemeContext);
    const { getUserById, getUserByUser, getUserName, getUserMode, getUserLang, getUserPass, setUser } = useContext(UserContext);


    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [usuario, setUsuario] = useState({});
    const [listaCursosFav, setListaCursosFav] = useState([]);


    const [show, setShow] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function removeFavCurso(id) { 
        const nuevaLista = lista
            .filter((curso) =>  curso.id != id)
            .map((curso) => {
                return (
                    <Col sm={6} md={4} lg={3} key={curso.id}>
                        <Card key={curso.id} className="mb-3 h-100">
                            <Card.Body>
                                <Card.Title>{curso.titulo}</Card.Title>
                            </Card.Body>
                            <Card.Footer >
                                <Button variant="primary">
                                    <Link to={`/cursos/${curso.id}`} className="text-white">Ver Detalles</Link>
                                </Button>
                                <Button variant="Link" onClick={() => removeFavCurso(curso.id)}>
                                    Eliminar Favorito
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                );
            })
        setListaCursosFav(lista);
    }

    useEffect(() => {
        console.log(id)
        if (!id) {
            handleShow();

            const timeout = setTimeout(() => {
                setRedirect(true);
            }, 2500);

        } else {

            const u = getUserById(id);
            setUsuario(u);
            setNewLanguage(u.lang);
            setNewTheme(u.mode);

            const lista = cursos
                .filter((curso) => u.fav.includes(curso.id))
                .map((curso) => {
                    return (
                        <Col sm={6} md={4} lg={3} key={curso.id}>
                            <Card key={curso.id} className="mb-3 h-100">
                                <Card.Body>
                                    <Card.Title>{curso.titulo}</Card.Title>
                                </Card.Body>
                                <Card.Footer >
                                    <Button variant="primary">
                                        <Link to={`/cursos/${curso.id}`} className="text-white">Ver Detalles</Link>
                                    </Button>
                                    <Button variant="Link" onClick={() => removeFavCurso(curso.id)}>
                                        Eliminar Favorito
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })
            setListaCursosFav(lista);

            console.log(listaCursosFav);
        }
    }, [id]);

    return (
        <>
            {id ?
                <>
                    <h2>Bienvenido, {getUserName(usuario)}</h2>

                    <Row>
                        <Col sm={12} md={3} lg={3}>
                            Email
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            {usuario.mail}
                        </Col>

                        <Col sm={12} md={3} lg={3}>
                            Contraseña
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            {usuario.password}
                        </Col>

                    </Row>
                    <Row>
                        <Col sm={12} md={3} lg={3}>
                            Modo
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            {usuario.mode}
                        </Col>

                        <Col sm={12} md={3} lg={3}>
                            Idioma
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            {usuario.lang}
                        </Col>

                    </Row>
                    <h3 >Cursos favoritos</h3>
                    {listaCursosFav}

                    <Row>

                    </Row>



                </>

                :
                redirect &&
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

export default Perfil
