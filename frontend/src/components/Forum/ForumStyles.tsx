import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";


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

`;
export const ForumTable = styled.div`
    height: 100%;
    border: 5px solid red
    min-width: 210px;
    background-color: #0FC2C0;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ;

`;

export const TableRow = styled(Row)`
  text-align: center;
  width: 100%;
//   box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  height: 2em;
`;

export const ForumHeader = styled.div`
  text-align: center;
  width: 100%;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  height: 100%;
  // 2em;
  font-weight: bold;
`;

export const ForumTile = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
    // font-size: 150%;
`;

