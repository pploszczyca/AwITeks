import styled from "styled-components";

export const Day = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);
  font-size: 150%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &.clickable:hover{
    cursor: pointer;
    background-color: #0FC2C0;
  }

  &.today {
    border: 3px solid #0b0e0d;
  }
`;

export const TileItemsWrapper = styled.div`
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NotificationsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 85%;
`;