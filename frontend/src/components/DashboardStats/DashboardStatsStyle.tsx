import styled from "styled-components";

export const StatsCard = styled.div`
  text-align: center;
  color: black;
  background-color: #0CABA8;
  font-size: 18px;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  & > p{
    margin: 0;
  }
  
  & .stat{
    color: white;
    font-size: 50px;
  }
`
