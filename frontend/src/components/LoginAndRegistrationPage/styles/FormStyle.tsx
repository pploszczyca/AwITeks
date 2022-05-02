import styled from "styled-components";
import {Container} from "react-bootstrap";

export const FormContainer = styled(Container)`
  background-color: white;
  border-radius: 20px;
  width: 50vw;
  height: 50vh;
  box-shadow: 1px 1px 10px -3px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media(max-width: 992px){
    width: 93vw;
    height: 60vh;
    padding-left: 15px!important;
    padding-right: 15px!important;
  }
`;
