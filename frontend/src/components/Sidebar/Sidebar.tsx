import React from 'react';
import { Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NavbarEdit, MobileNavbar } from './SidebarStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendarDays, faSeedling, faComments, faGear } from '@fortawesome/free-solid-svg-icons'


function buildNavLink(to: string, mobile: boolean, content: any) {
    return (
        <Nav.Link
            as={Link}
            key={to}
            to={to}
            style={{ color: window.location.pathname === to ? "#0FC2C0" : "rgba(255,255,255,.55)" }}
        >
            {mobile ? <FontAwesomeIcon style={{ fontSize: 26 }} icon={content} /> : <span>{content}</span>}
        </Nav.Link >
    );
}

const PATHS = {
    '/': ['Strona główna', faHouse],
    '/my-plants': ['Moje rośliny', faSeedling],
    '/calendar': ['Kalendarz', faCalendarDays],
    '/forum': ['Forum', faComments],
    '/settings': ['Ustawienia', faGear],
};

const Sidebar: React.FC<{}> = () => {
    useNavigate(); // rerenders components on url change

    return (
        <>
            <NavbarEdit variant="dark" className="d-md-block d-none">
                <Container className="d-flex flex-column">
                    <div id="logo"><p>awITex</p></div>
                    <Nav className="me-auto d-flex flex-column" id="menu-options">
                        {Object.entries(PATHS).map(([to, [title]]) => buildNavLink(to, false, title))}
                    </Nav>
                </Container>
            </NavbarEdit>
            <MobileNavbar className="d-md-none d-sm-block">
                <Nav className="d-flex justify-content-center">
                    {Object.entries(PATHS).map(([to, [_, icon]]) => buildNavLink(to, true, icon))}
                </Nav>
            </MobileNavbar>
        </>

    );
}

export default Sidebar;
