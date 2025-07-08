import cursos from './data/cursos.js';
import { Card, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

function Cursos() {

    const [searchParams, setSearchParams] = useSearchParams();
    const cat = searchParams.get('cat');
    const niv = searchParams.get('niv');

    const navigate = useNavigate();

    function reLoadCursos(newCat, newNiv) {
        //const newUrl = `/cursos?${newCat ? `cat=${newCat}` :  ''}&${newNiv ? `niv=${newNiv}` : ''}`;
        //navigate(newUrl, { replace: true });

        const newParams = new URLSearchParams(searchParams);
        newParams.set('cat', newCat ? newCat : "");
        newParams.set('niv', newNiv ? newNiv : "");
        setSearchParams(newParams);

    }

    const [selCat, setSelCat] = useState("Todos");
    const [selNivel, setSelNivel] = useState("Todos");

    const catLabels = {
        "": "Todos",
        null: "Todos",
        frontend: "Frontend",
        backend: "Backend",
        herramientas: "Herramientas",
        devops: "Devops"
    };

    const nivLabels = {
        "": "Todos",
        null: "Todos",
        basico: "Básico",
        intermedio: "Intermedio",
        avanzado: "Avanzado"
    };

    useEffect(() => {
        setSelCat(catLabels.hasOwnProperty(cat) ? catLabels[cat] : "Todos");
        setSelNivel(nivLabels.hasOwnProperty(niv) ? nivLabels[niv] : "Todos");
    }, [cat, niv]);

    const listaCursos = cursos
        .filter((curso) => cat === null || cat === "" || curso.categoria === cat)
        .filter((curso) => niv === null || niv === "" || curso.nivel === niv)
        .map((curso) => {
            return (
                <Col sm={6} md={4} lg={3} key={curso.id}>
                    <Card  className="mb-3 h-100">
                        <Card.Body>
                            <Card.Title>{curso.titulo}</Card.Title>
                        </Card.Body>
                        <Card.Footer >
                            <Button variant="primary">
                                <Link to={`/cursos/${curso.id}`} className="text-white">Ver Detalles</Link>
                            </Button>

                        </Card.Footer>
                    </Card>
                </Col>
            );
        })

    return (
        <>
            <h1>Lista de Cursos</h1>
            <Row className="mb-3">
                <Col sm={12} md={6} lg={6}>
                    <h5>Categoría</h5>
                    <DropdownButton id="dropdown-item-button-cat" title={selCat}>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos(null, niv); setSelCat('Todos') }}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('frontend', niv); setSelCat('Frontend') }}>Frontend</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('backend', niv); setSelCat('Backend') }}>Backend</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('herramientas', niv); setSelCat('Herramientas') }}>Herramientas</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('devops', niv); setSelCat('Devops') }}>Devops</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <h5>Nivel</h5>
                    <DropdownButton id="dropdown-item-button-niv" title={selNivel}>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos(cat, null); setSelNivel('Todos') }}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos(cat, 'basico'); setSelNivel('Básico') }}>Básico</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos(cat, 'intermedio'); setSelNivel('Intermedio') }}>Intermedio</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos(cat, 'avanzado'); setSelNivel('Avanzado') }}>Avanzado</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                {listaCursos}
            </Row>


        </>
    )
}

export default Cursos

/* op1
//op1 const [categoria, setCategoria] = useState(["frontend", "backend", "herramientas", "devops"])
//op1 const [nivel, setNivel] = useState(["basico", "intermedio", "avanzado"])

//op1 .filter((curso) => categoria.includes(curso.categoria))
//op1 .filter((curso) => nivel.includes(curso.nivel))

<Row className="mb-3">
                <Col sm={12} md={6} lg={6}>
                    <h5>Categoría</h5>
                    <DropdownButton id="dropdown-item-button" title={selCat}>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria(["frontend", "backend", "herramientas", "devops"]); setSelCat('Todos')}}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button"  onClick={() => {setCategoria(['frontend']); setSelCat('Frontend')}}>Frontend</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria(['backend']); setSelCat('Backend')}}>Backend</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria(['herramientas']); setSelCat('Herramientas')}}>Herramientas</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria(['devops']); setSelCat('Devops')}}>Devops</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <h5>Nivel</h5>
                    <DropdownButton id="dropdown-item-button" title={selNivel}>
                        <Dropdown.Item as="button"  onClick={() => {setNivel(["basico", "intermedio", "avanzado"]); setSelNivel('Todos')}}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button"  onClick={() => {setNivel(['basico']); setSelNivel('Básico')}}>Básico</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setNivel(['intermedio']); setSelNivel('Intermedio')}}>Intermedio</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setNivel(['avanzado']); setSelNivel('Avanzado')}}>Avanzado</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>


*/

/* op2
//op2 const [categoria, setCategoria] = useState("")
//op2 const [nivel, setNivel] = useState("")

//op2 .filter((curso) => categoria != null || curso.categoria == categoria)
//op2 .filter((curso) => nivel != null || curso.categoria == nivel)

<Row className="mb-3">
                <Col sm={12} md={6} lg={6}>
                    <h5>Categoría</h5>
                    <DropdownButton id="dropdown-item-button" title={selCat}>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria(""); setSelCat('Todos')}}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button"  onClick={() => {setCategoria('frontend'); setSelCat('Frontend')}}>Frontend</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria('backend'); setSelCat('Backend')}}>Backend</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria('herramientas'); setSelCat('Herramientas')}}>Herramientas</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setCategoria('devops'); setSelCat('Devops')}}>Devops</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <h5>Nivel</h5>
                    <DropdownButton id="dropdown-item-button" title={selNivel}>
                        <Dropdown.Item as="button"  onClick={() => {setNivel(""); setSelNivel('Todos')}}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button"  onClick={() => {setNivel('basico'); setSelNivel('Básico')}}>Básico</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setNivel('intermedio'); setSelNivel('Intermedio')}}>Intermedio</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => {setNivel('avanzado'); setSelNivel('Avanzado')}}>Avanzado</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>

*/