import styled from "styled-components";

export const ChipsButton = styled.button`
    width: 100%;
    min-height: 40px;
    border: 3px solid #008F8C;
    outline: none;
    border-radius: 50px;
    font-size: 17px;
    padding: 5px;
    color: #008F8C;
    font-weight: bold;
    text-align: center;
  
    &.active{
      background-color: #008F8C;
      color: white;
    }
`;
