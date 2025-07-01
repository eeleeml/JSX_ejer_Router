import { Card, Button } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";

function Home() {

    return (
        <>
            <h1>¡Bienvenido a la academia en línea!</h1>

            <Card border="primary">
                <Card.Header>Comienza tu formación</Card.Header>
                <Card.Body>
                    <Card.Title>Nuestros cursos</Card.Title>
                    <Card.Text>
                        Accede a nuestros cursos y mejora tus habilidades en programación, diseño y más.
                    </Card.Text>
                    <Button variant="outline-primary" size='lg'><Link to="/cursos">Acceder</Link></Button>
                </Card.Body>
            </Card>

        </>
    )
}

export default Home