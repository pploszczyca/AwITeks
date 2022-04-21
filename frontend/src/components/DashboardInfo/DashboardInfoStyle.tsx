import styled from "styled-components";
import {Row} from "react-bootstrap";

export const InfoElement = styled.div`
  height: 60vh;
  background-color: #EBEBEB;
  text-align: center;
  font-size: 20px;
  padding-top: 20px;
`

export const MobileRow = styled(Row)`
  @media(max-width: 767px){
    margin-bottom: 100px;
  }
`
