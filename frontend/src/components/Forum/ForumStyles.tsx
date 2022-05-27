import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {SearchBox, SearchBoxContainer} from "../PlantsView/PlantsViewStyles";


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
      max-width: 30%;
    }
    &.num {
      min-width: 10%;
      max-width: 15%;
    }
    &.username{
      max-width: 20%;
    }
    &.date{
      max-width: 15%;
    }
    &.action{
      max-width: 20%;
    }

    /* There is not enough space in mobile mode to display so much data in one line. 
       That's why I decided to turn off the visibility of some columns. */
    @media (max-width: 550px) {
      &.title{
        max-width: 60%;
      }
      &.num {
        display: none;
      }
      &.username{
        display: none;
      }
      &.date{
        display: none;
      }
      &.action{
        max-width: 40%;
      }
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
  
  @media(max-width: 768px){
    left: 0;
    width: 100vw;
    padding-right: 10px;
    padding-bottom: 100px;
  }
`;

export const SearchBoxContainerModified = styled(SearchBoxContainer)`
  height: 40px;
  font-size: 17px;
`;

export const SearchBoxModified = styled(SearchBox)`
  height: 40px;
`;

export const AddThreadBtn = styled.button`
  border-radius: 10px;
  background-color: #008F8C;
  height: 40px;
  width: 100%;
  font-size: 17px;
  color: white;
  border: none;
  outline: none;
`;
