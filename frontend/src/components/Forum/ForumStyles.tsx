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
    justify-content: center;

    :hover {
        opacity: 0.9;
        cursor: pointer;
    }

`;

export const ForumCol =  styled(Col)`
    padding: 1px;
    border: 1px solid black;
    justify-content: center;
    display: flex;
    min-width: 0;

    &.title{
      max-width: 35%;
    }
    &.num{
      max-width: 15%;
    }
    &.username{
      max-width: 20%;
    }
    &.date{
      max-width: 20%;
    }
    &.action{
      max-width: 10%;
    }

`;

export const ForumRow = styled(Row)`
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 2.5em;
  vertical-align: middle;
`;

export const ForumHeader = styled.div`
  justify-content: center;
  vertical-align: middle;
  width: 100%;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  height: 100%;
  font-weight: bold;
  background-color: #f5f5f5;
  padding-top: 0.4em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
`;

export const ForumTile = styled.div`
    justify-content: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    width: 100%;
    height: 100%;
    box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
    background-color: #f5f5f5;

    &.not-last{
      padding-top: 0.4em;
    }
`;

export const ForumContainer = styled.div` 
  position: absolute;
  left: var(--sidebar-width);
  right: 0;
  justify-content: center;
  margin-right: 6px;
  margin-left: 6px;
`;
