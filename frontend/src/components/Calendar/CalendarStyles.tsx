import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Card, Col} from "react-bootstrap";
import styled from "styled-components";


export const CalendarCol = styled(Col)`
    padding: 1px;
    //width: calc(var());
`;

export const DayWrapperCard = styled(Card)`
    height: 100%;
    min-height: 7em;
`;

export const CalendarService = styled.div`
  height: 100%;
  min-width: 210px;
  background-color: #0FC2C0;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  
  & div:first-child{
    font-size: 120px;
  }
  
  & div:nth-child(2), & div:last-child{
    font-size: 30px;
  }
  & div:nth-last-child(2){
    font-size: 30px;
  }
  
  & div:nth-child(2){
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    padding: 0 5px;
    line-height: 60px;
    
    & p{
      min-width: 80%;
      margin: 0;
      padding: 0 5px;
    }
  }
`;

export const CalendarContainer = styled.div`
    max-width: 1400px;
    margin: auto;
`;


export const Arrow = styled(FontAwesomeIcon)`
    color: white;

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
  font-size: 25px;
  padding: 10px 0;
  border-radius: 5px;
  margin: 40px 0;
  position: relative;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
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
