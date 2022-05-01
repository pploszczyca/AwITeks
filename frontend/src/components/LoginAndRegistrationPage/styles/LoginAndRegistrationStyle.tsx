import {Nav} from "react-bootstrap";
import styled from "styled-components";

export const PillItem = styled(Nav.Item)`
  cursor: pointer;
  & .nav-link{
    color: #023535;
    border: solid 1px #023535;
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  &:first-child{
    margin-right: 5px;
  }
  
  & .nav-link.active{
    background-color: #023535;
  }
  
`;

export const Content = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Commissioner&family=Montserrat:ital,wght@0,100;0,400;1,200&display=swap');
  font-family: 'Montserrat', sans-serif;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
 
  & h1{
    font-size: 48px;
  }

  @media(max-width: 992px){
    margin-top: 100px;
    & h1{
      font-size: 36px;
    }
  }
`;
