import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";


// export const Star = styled(FontAwesomeIcon)`
//   color: #FFD700;
//   margin-left: 10px;

//   :hover {
//       opacity: 0.7;
//       cursor: pointer;
//   }

//   &.starred{
//     background-color: blue;
//   }
//   &.unstarred{
//     background-color: yellow;
//   }
// `;

export const StarPolygon = styled.div`
  position: relative;
  top: 0%;
  left: 80%;
  width: 20px;
  height: 20px;
  // background-color: #FFD700;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );

  &.starred{
    background-color: yellow;
  }
  &.unstarred{
    background-color: grey;
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

    &.red{
      width: 100%;
      // border: 2px solid red;
    }
    &.green{
      width: 80%;
      // border: 2px solid green;
    }
    &.yellow{
      width: 90%;
      // border: 2px solid yellow;
    }

`;
export const ForumTable = styled.div`
    height: 100%;
    min-width: 210px;
    background-color: #0FC2C0;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
    border-spacing: 0;
`;

export const TableRow = styled(Row)`
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
