import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";


export const Star = styled(FontAwesomeIcon)`
  color: #FFD700;
  margin-left: 10px;

  :hover {
      opacity: 0.7;
      cursor: pointer;
  }

  &.starred{
    color: #FFD700;
  }
  &.unstarred{
    color: grey;
  }
`;

export const OpenButton = styled(Button)`
    background-color: #008F8C;
    outline: none;
    border: none;
    color: white;
    font-size: 100%;
    border-radius: 2px;
    :hover {
        opacity: 0.9;
        cursor: pointer;
    }

`;

export const ForumCol =  styled(Col)`
    padding: 1px;
    border: 1px solid black;

    &.title{
      max-width: 450px;
    }
    &.num{
      max-width: 150px;
    }
    &.username{
      max-width: 250px;
    }
    &.date{
      max-width: 200px;
    }
    &.action{
      max-width: 150px;
    }

`;

export const ForumRow = styled(Row)`
  text-align: center;
  width: 100%;
  height: 2.5em;
`;

export const ForumHeader = styled.div`
  text-align: center;
  width: 100%;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  height: 100%;
  font-weight: bold;
  background-color: #f5f5f5;
  
`;

export const ForumTile = styled.div`
    text-align: center;
    // width: 100%;
    height: 100%;
    box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
    background-color: #f5f5f5;
`;
