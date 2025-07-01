import cursos from './data/cursos.js';
import { useParams } from 'react-router-dom';


import { Card, Button,  Container, Col, Row } from 'react-bootstrap';


function CursoDetalle() {
    const parametros = useParams();
    const id = parametros.id;


    const listaCursos = cursos.filter((curso) => curso.id == id).map((curso) => {
        return (
            <Col sm={12} md={12} lg={12} key={curso.id}>
                <Card key={curso.id} className="mb-3 h-100">
                    <Card.Body>
                        <Card.Title>{curso.titulo}</Card.Title>
                        <Card.Text >{curso.descripcion}</Card.Text>

                        
                    </Card.Body>
                    <Card.Footer >
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <Card.Text >Categoría:</Card.Text>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <Card.Text >Nivel:</Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <Card.Text style={{fontSize:'30px'}}>{curso.categoria}</Card.Text>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <Card.Text style={{fontSize:'30px'}}>{curso.nivel}</Card.Text>
                            </Col>
                        </Row>
                        
                        
                    </Card.Footer>
                </Card>
            </Col>
        );
    })

    return (
        <>  {listaCursos.length > 0 ? (
            <Container>
                <Row>
                    {listaCursos}
                </Row>
                
            </Container>
        ) : (
            <Container>
                <h2>Curso no encontrado</h2>
                <p>El curso con ID {id} no existe.</p>
            </Container>
        )}

        </>
    )
}

export default CursoDetalle