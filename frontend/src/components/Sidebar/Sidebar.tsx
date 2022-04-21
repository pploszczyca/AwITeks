import React from 'react';
import { Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NavbarEdit, MobileNavbar } from './SidebarStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendarDays, faSeedling, faComments } from '@fortawesome/free-solid-svg-icons'

const Sidebar: React.FC<{}> = () => {
    useNavigate(); // rerenders components on url change

    return (
        <>
            <NavbarEdit variant="dark" className="d-md-block d-none">
                <Container className="d-flex flex-column">
                    <div id="logo"><p>awITex</p></div>
                    <Nav className="me-auto d-flex flex-column" id="menu-options">
                        <Nav.Link as={Link} to="/" style={{ color: window.location.pathname === '/' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>Strona Główna</Nav.Link>
                        <Nav.Link as={Link} to="/my_plants" style={{ color: window.location.pathname === '/my_plants' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>Moje rośliny</Nav.Link>
                        <Nav.Link as={Link} to="/calendar" style={{ color: window.location.pathname === '/calendar' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>Kalendarz</Nav.Link>
                        <Nav.Link as={Link} to="/forum" style={{ color: window.location.pathname === '/forum' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>Forum</Nav.Link>
                        <Nav.Link as={Link} to="/settings" style={{ color: window.location.pathname === '/settings' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>Ustawienia</Nav.Link>
                    </Nav>
                </Container>
            </NavbarEdit>
            <MobileNavbar className="d-md-none d-sm-block">
                <Nav className="d-flex justify-content-center">
                    <Nav.Link as={Link} to="/" style={{ color: window.location.pathname === '/' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>
                        <FontAwesomeIcon icon={faHouse} fontSize={26}/>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/my_plants" style={{ color: window.location.pathname === '/my_plants' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>
                        <FontAwesomeIcon icon={faSeedling} fontSize={26}/>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/calendar" style={{ color: window.location.pathname === '/calendar' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>
                        <FontAwesomeIcon icon={faCalendarDays} fontSize={26}/>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/forum" style={{ color: window.location.pathname === '/forum' ? "#0FC2C0" : "rgba(255,255,255,.55)" }}>
                        <FontAwesomeIcon icon={faComments} fontSize={26}/>
                    </Nav.Link>
                </Nav>
            </MobileNavbar>
        </>

    );
}

export default Sidebar;
