import styled from "styled-components";
import {Container} from "react-bootstrap";

export const FormContainer = styled(Container)`
  background-color: white;
  border-radius: 20px;
  width: 50vw;
  min-height: 60vh;
  box-shadow: 1px 1px 10px -3px rgba(0, 0, 0, 1);
  
  @media(max-width: 992px){
    width: 93vw;
    //margin-left: 0!important;
    //margin-right: 0!important;
    padding-left: 15px!important;
    padding-right: 15px!important;
    
  }
`;
