import styled from "styled-components";

export const Day = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  font-size: 150%;

  &.clickable:hover{
    cursor: pointer;
    background-color: #0FC2C0;
  }

  &.today {
    border: 3px solid #0b0e0d;
  }
`;


export const NotificationWrapperMid = styled.div`
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const NotificationWrapperRight = styled.div`
    border: none;
    position: absolute;
    top: 0px;
    right: 3px;
`;