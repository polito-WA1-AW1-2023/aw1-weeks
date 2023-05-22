import { Navbar, Container } from "react-bootstrap";

function NavHeader(props) {
    return (
        <Navbar bg='primary' variant='dark'>
            <Container fluid>
                <Navbar.Brand className='fs-2'>{props.appName || "HeapOverrun"}</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavHeader;