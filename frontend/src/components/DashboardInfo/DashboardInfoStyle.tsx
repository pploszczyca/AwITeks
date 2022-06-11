import styled from "styled-components";
import {Col, Row} from "react-bootstrap";

export const InfoElement = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  font-weight: bold;
  width: 100%;
  color: #023535;
  
  &::after{
    content: '';
    width: 60%;
    height: 1px;
    background-color: #023535;
    display: block;
    margin: 5px auto;
  }
`

export const MobileRow = styled(Row)`
  @media(max-width: 767px){
    margin-bottom: 100px;
  }
`

export const StatsCol = styled(Col)`
  height: 60vh;
  background-color: #EBEBEB;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`

export const StatsRow = styled(Row)`
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  
  &:last-child{
    border: none;
  }
`
