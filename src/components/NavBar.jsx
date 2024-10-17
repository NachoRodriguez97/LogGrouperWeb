import '../styles/navbar.css'
import logo from '../assets/Logo.svg'
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Dropdown, ListGroup, ListGroupItem, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { UseLogout } from "../hooks/UseLogout";

export const NavBar = () => {

    const [impresoraPedidos, setImpresoraPedidos] = useState(localStorage.getItem('impresoraPedidos') || 'Sin impresora');
    const [impresoraRemitos, setImpresoraRemitos] = useState(localStorage.getItem('impresoraRemitos') || 'Sin impresora');
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [usuario, setUsuario] = useState(userInfo["username"]);
    const [show, setShow] = useState(false);
    const [navItems, setNavItems] = useState([]);
    const navigate = useNavigate();
    const { setLogout } = UseLogout();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Actualizar estados cuando cambian los valores en el local storage
        setImpresoraPedidos(localStorage.getItem('impresoraPedidos') || 'Sin impresora');
        setImpresoraRemitos(localStorage.getItem('impresoraRemitos') || 'Sin impresora');
        setUsuario(userInfo["username"]);
    }, []);

    const handleLogout = () => {
        setLogout();
    }

    const infoDivStyle = {
        backgroundColor: "green",
        color: "white",
        fontWeight: "500"
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Button variant="outline-dark" onClick={handleShow} className="me-2">
                        ☰
                    </Button>

                    {/* Logo y enlaces en el mismo contenedor con espaciador entre ellos */}
                    <Navbar.Brand className="d-flex align-items-center">
                        <img
                            src={logo}
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>

                    {/* Nombre de usuario y botón de cerrar sesión */}
                    <Nav className="ml-auto align-items-center">
                        {/* <Nav.Item className="mr-2">
                            <Navbar.Text>
                                {usuario}
                            </Navbar.Text>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Button variant="outline-dark" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <div id="printerInfo" className='d-flex justify-content-center' style={infoDivStyle}>Etiqueta: impresora1  |   Listado: impresora2</div>
            {/* Sidebar */}
            <Offcanvas show={show} onHide={handleClose} className='d-flex flex-column flex-shrink-0 p-3 bg-light'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mesa de Control</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroupItem key="1">
                            <NavLink key="1" to={`/Grouper/SelectPrinters`}>
                                CONFIGURACIÓN DE IMPRESORA
                            </NavLink>
                        </ListGroupItem>
                    </ListGroup>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            {usuario}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
