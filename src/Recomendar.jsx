import cursos from './data/cursos.js';
import { Card, Button, Row, Col, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';
import { Next } from 'react-bootstrap/esm/PageItem.js';

function Recomendar() {

    const [searchParams, setSearchParams] = useSearchParams();
    const cat = searchParams.get('cat');
    const horas = parseInt(searchParams.get('horas'));

    const navigate = useNavigate();

    function reLoadCursos(newCat, newHoras) {
        const newUrl = `/recomendar?${newCat ? `cat=${newCat}` : ''}&${newHoras ? `horas=${newHoras}` : ''}`;
        navigate(newUrl, { replace: true });
    }

    const [selCat, setSelCat] = useState("Todos");

    function sumar() {
        const newHoras = horas ? horas + 1 : 1;
        reLoadCursos(cat, newHoras);
    }

    function restar() {
        const newHoras = horas ? horas - 1 : 0;
        reLoadCursos(cat, newHoras);
    }

    function handleChange(event) {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            reLoadCursos(cat, value);
        }
    }

    const [listaCursosCategoria, setListaCursosCategoria] = useState([]);
    const [listaCursosCategoriaMostrar, setListaCursosCategoriaMostrar] = useState([]);

    const [arbol,setArbol] = useState([]);

    useEffect(() => {
        switch (cat) {
            case null:
            case "":
                setSelCat("Todos");
                break;
            case "frontend":
                setSelCat("Frontend");
                break;
            case "backend":
                setSelCat("Backend");
                break;
            case "herramientas":
                setSelCat("Herramientas");
                break;
            case "devops":
                setSelCat("Devops");
                break;
            default:
                setSelCat("Todos");
                break;
        }

        let newListaCursosCategoria = cursos
                .filter((curso) => cat === null || cat === "" || curso.categoria == cat)

        setListaCursosCategoria(newListaCursosCategoria);
        setListaCursosCategoriaMostrar(listaCursosCategoria);


        // para cada curso, obtener horas, valor, curso y acumular lo de los requeridos
        let newArbol = [];

        for (let i = 0; i < newListaCursosCategoria.length; i++) {
            newArbol.push(valorRama(newListaCursosCategoria[i]));
        }
        setArbol(newArbol);
        if(horas > 0) recomienda(newArbol);

    }, [cat]);


    // ordenar por valor
    function ordenarValor(cursoA, CursoB) {
        if (cursoA.valor > CursoB.valor) { return -1; }
        else if (cursoA.valor < CursoB.valor) { return 1; }
        return 0;
    }

    function findCursoByID(id) {

        return cursos.filter((curso) => curso.id == id)[0]
    }

    function valorRama(curso) {
        let rama = {
            horas: curso.duracion,
            valor: curso.valor,
            cursos: [curso]
        };

        if (curso.requiere.length >= 1) {
            let accVal = 0;
            let accHoras = 0;
            let requeridos = [];
            for (let r = 0; r < curso.requiere.length; r++) {
                let rama2 = valorRama(findCursoByID(curso.requiere[r]));
                accVal += rama2.valor;
                accHoras += rama2.horas;
                requeridos.push(findCursoByID(curso.requiere[r]));
            }

            rama.horas += accHoras;
            rama.valor += accVal;
            rama.cursos.push(...requeridos)

            return rama

        } else {
            //base case
            return rama
        }
    }


    function recomienda(arbol) {
        // Obtener la combinacion de max valor en tiempo dado si utilizamos cada curso
        let combMax = {
            horas: 0,
            valor: 0,
            cursos: []
        };
        // creamos matriz de cursos+1 x horas+1. Los 0 sirven de caso base
        // iremos rellenando para cada curso la combinacion que maximiza valor hasta
        // la columna de tiempo maximo que es la que nos interesa
        let arbolSize = arbol.length;
        let matrizValores = Array.from({ length: arbolSize+1}, () => Array(horas + 1).fill(0));

        for (let rama = 1; rama <= arbolSize; rama++){
            let curso = arbol[rama - 1]; // curso actual
            for(let t=0; t<=horas;t++){
                if(curso.horas >t){                                                     // nos pasamos de horas
                    matrizValores[rama][t] = matrizValores[rama-1][t];                  // no coger este curso
                }else{
                    matrizValores[rama][t] = Math.max(                                  // elegimos entre
                        matrizValores[rama-1][t],                                       // no coger este curso
                        matrizValores[rama-1][t-curso.horas] + curso.valor              // haberlo cogido
                    )
                }
            }
        }

        // el valor max esta en el ultimo valor
        combMax.valor = matrizValores[arbolSize][horas];

        // comprobamos en la columna de horas que cursos se han cogido (no llegamos a fila 0)
        // guardamos las horas utilizadas
        let t=horas;
        for (let rama = arbolSize; rama >0; rama--){
            if(matrizValores[rama][t] != matrizValores[rama-1][t]){ // si es distinto, cogimos el curso rama-1
                combMax.horas += arbol[rama-1].horas;
                combMax.cursos.push(...arbol[rama-1].cursos);

                // pasamos al siguiente
                t-= arbol[rama-1].horas;
            }
        }

        setListaCursosCategoriaMostrar(combMax.cursos);
        console.log("recomendando ", combMax.cursos);

    }

    const listaCursos = listaCursosCategoriaMostrar
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
                        </Card.Footer>
                    </Card>
                </Col>
            );
        });

    //console.log("recomendando ", listaCursosCategoria);

    return (
        <>
            <h1>Lista de Cursos</h1>
            <Row className="mb-3">
                <Col sm={12} md={4} lg={4}>
                    <h5>Categoría</h5>
                    <DropdownButton id="dropdown-item-button" title={selCat}>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos(null, horas); setSelCat('Todos') }}>Todos</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('frontend', horas); setSelCat('Frontend') }}>Frontend</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('backend', horas); setSelCat('Backend') }}>Backend</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('herramientas', horas); setSelCat('Herramientas') }}>Herramientas</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => { reLoadCursos('devops', horas); setSelCat('Devops') }}>Devops</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col sm={12} md={4} lg={4}>
                    <h5>Horas</h5>
                    <Button onClick={() => sumar()}>+</Button>
                    <input style={{ textAlign: 'center' }}
                        type="number"
                        value={horas ? horas : 0}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button disabled={!horas ? true : (horas == 0 ? true : false)} onClick={() => restar()}>-</Button>

                </Col>

                <Col sm={12} md={4} lg={4}>

                    <Button onClick={() => recomienda(arbol)}>Recomienda</Button>

                </Col>
            </Row>
            <Row>
                {listaCursos}
            </Row>


        </>
    )
}

export default Recomendar

