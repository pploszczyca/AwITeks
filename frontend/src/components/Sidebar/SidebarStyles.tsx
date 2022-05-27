import styled from "styled-components";
import {Navbar} from "react-bootstrap";

export const NavbarEdit = styled(Navbar)`
  height: 100vh;
  width: var(--sidebar-width);
  background-color: #023535;
  position: fixed;
  top: 0;
  left: 0;
  
  & > *{
    position: absolute;
    top: 10%;
  }
  
  & #menu-options{
    font-size: 20px;
    margin-top: 50px;
  }
  
  & #logo {
    position: relative;
    color: white;
    padding: 0.2em 0.5em;
    font-size: 48px;
    
    &::before, &::after, &>:first-child::before, &>:first-child::after{
      position:absolute; 
      content:' ';
      width:30px; 
      height: 30px;
      border: solid #0FC2C0;
    }
    &::before {
      top:0;
      left:0;
      border-width: 0.2em 0 0 0.2em
    }
    &::after {
      top:0;
      right:0;
      border-width: 0.2em 0.2em 0 0
    }
    &>:first-child:before {
      bottom:0;
      right:0;
      border-width: 0 0.2em 0.2em 0
    }
    &>:first-child:after {
      bottom:0;
      left:0;
      border-width: 0 0 0.2em 0.2em
    }
  }
`;

export const MobileNavbar = styled.div`
  background-color: #023535;
  width: 100vw;
  height: 100px;
  position: fixed;
  top: 100%;
  left: 0;
  transform: translateY(-50%);
  z-index: 3;
`;
