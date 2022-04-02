import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import styled from "styled-components";

let NavbarEdit = styled(Navbar)`
  height: 100vh;
  width: 15vw;
  background-color: #023535;
  
  & > *{
    position: absolute;
    top: 10%;
  }
  
  & #menu-options{
    font-size: 20px;
    margin-top: 50px;
  }
  
  & #logo {
    border: 0.2em solid #0FC2C0;
    padding: 0.4em 0.5em;
    position: relative;
    color: white;
    font-size: 48px;

    &::before, &::after {
      content: '';
      display: block;
      position: absolute;
      background: #023535;
    }

    &::before {
      top: -0.3em; // let it overlap a bit to prevent thin line which could appear during scaling in some browsers etc.
      bottom: -0.3em;
      left: 0.5em;
      right: 0.5em;
    }

    &::after{
      left: -0.3em;
      right: -0.3em;
      top: 0.5em;
      bottom: 0.5em;
    }

    // you need this to move the text in front of the ::after overlay
    #logo-text {
      position: relative;
      z-index: 1;
    }
  }
`

function Sidebar() {
    return (
        <NavbarEdit variant="dark">
            <Container className="d-flex flex-column">
                <h1 id="logo">
                    <span id="logo-text">awITex</span>
                </h1>

                <Nav className="me-auto d-flex flex-column" id="menu-options">
                    <Nav.Link className="nav-item" href="#home">Strona Główna</Nav.Link>
                    <Nav.Link className="nav-item" href="#features">Moje rośliny</Nav.Link>
                    <Nav.Link className="nav-item" href="#pricing">Kalendarz</Nav.Link>
                    <Nav.Link className="nav-item" href="#pricing">Forum</Nav.Link>
                    <Nav.Link className="nav-item" href="#pricing">Ustawienia</Nav.Link>
                </Nav>
            </Container>
        </NavbarEdit>
    );
}

export default Sidebar;
