import React from 'react';
import {Button, Container, Nav} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {MobileNavbar, NavbarEdit} from './SidebarStyles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarDays, faComments, faGear, faHouse, faSeedling} from '@fortawesome/free-solid-svg-icons'
import {PageRoutes} from '../../utils/constants';
import {selectIsLoggedIn, useAppDispatch, useAppSelector} from '../../Store/store';
import {logout} from '../../Store/features/auth/authSlice';


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
    [PageRoutes.DASHBOARD]: ['Strona główna', faHouse],
    [PageRoutes.MY_PLANTS]: ['Moje rośliny', faSeedling],
    [PageRoutes.CALENDAR]: ['Kalendarz', faCalendarDays],
    [PageRoutes.FORUM]: ['Forum', faComments],
    [PageRoutes.SETTINGS]: ['Ustawienia', faGear],
};

const Sidebar: React.FC<{}> = () => {
    useNavigate(); // rerenders components on url change
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();

    return (
        <div style={{ display: window.location.pathname === '/home' ? 'none' : 'block' }}>
            <NavbarEdit variant="dark" className="d-md-block d-none">
                <Container className="d-flex flex-column">
                    <div id="logo"><p>awITex</p></div>
                    <Nav className="me-auto d-flex flex-column" id="menu-options">
                        {Object.entries(PATHS).map(([to, [title]]) => buildNavLink(to, false, title))}
                        {
                            isLoggedIn && // TODO this is only for convenience here, will be moved in the future
                            (
                                <Button
                                    onClick={() => dispatch(logout())}
                                >
                                    Wyloguj
                                </Button>
                            )
                        }
                    </Nav>
                </Container>
            </NavbarEdit>
            <MobileNavbar className="d-md-none d-sm-block">
                <Nav className="d-flex justify-content-center">
                    {Object.entries(PATHS).map(([to, [_, icon]]) => buildNavLink(to, true, icon))}
                </Nav>
            </MobileNavbar>
        </div>

    );
}

export default Sidebar;
