import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col } from "react-bootstrap";
import styled from "styled-components";


export const CalendarCol = styled(Col)`
    padding: 1px;
`;

export const DayWrapperCard = styled(Card)`
    height: 100%;
    min-height: 7em;
`;

export const CalendarService = styled.div`
  height: 100%;
  min-width: 180px;
  background-color: #0FC2C0;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  
  & div:first-child{
    font-size: 70px;
  }
  
  & div:nth-child(2), & div:last-child{
    font-size: 25px;
  }
  & div:nth-last-child(2){
    font-size: 25px;
  }
  
  & div:nth-child(2){
    display: flex;
    
    & p{
      width: 150px;
    }
  }
`;

export const CalendarContainer = styled.div`
    max-width: 1400px;
    margin: auto;
`;


export const Arrow = styled(FontAwesomeIcon)`
    color: black;

    :hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;


export const ExportButton = styled.button`
  background-color: #008F8C;
  outline: none;
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px 40px;
  border-radius: 5px;
  margin: 40px 0px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  :hover {
        opacity: 0.9;
        cursor: pointer;
    }
`;

export const DayHeader = styled.div`
  text-align: center;
  width: 100%;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  height: 2em;
  font-weight: bold;
`;


export const CalendarServiceBottom = styled.div`
    width: 100%;
    box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
    font-size: 120%;
    background-color: #0FC2C0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color: white;
`;