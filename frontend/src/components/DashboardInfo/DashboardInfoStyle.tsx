import styled, {css} from "styled-components";
import {Col, Row} from "react-bootstrap";

export const InfoElement = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  font-weight: bold;
  width: 100%;
  color: #023535;
  
  &::after{
    content: '';
    width: 60%;
    height: 1px;
    background-color: #023535;
    display: block;
    margin: 5px auto;
  }
`

export const MobileRow = styled(Row)`
  @media(max-width: 767px){
    margin-bottom: 100px;
  }
`

export const StatsCol = styled(Col)`
  height: 60vh;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`

export const StatsRow = styled(Row)`
  transition: transform linear 0.2s;
  margin: 2px 5px;
  border-radius: 10px;
  box-shadow: 4px 5px 15px -12px rgba(66, 68, 90, 1);
  background-color: white;
  box-sizing: border-box;

  &:last-child {
    border: none;
  }

  &:hover {
    transform: scale(1.1);
  }

  & .col {
    font-weight: bold;
    display: flex;
    align-items: center;
    max-height: 100%;
    max-width: 100%;
    padding: 0 5px 0 5px;
    
    & p {
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 100%;
      width: 85%;
      z-index: 3;
    }
  }

  & .col:first-child {
    background-color: whitesmoke;
    clip-path: circle(71.4% at 28% 50%);
    color: #0CABA8;
    overflow: hidden;
  }

  & .col::before {
    z-index: 2;
    display: block;
    position: absolute;
    font-size: 6rem;
    color: #f5f5f5;
    text-shadow: -1px 0 lightgray, 0 1px lightgray, 1px 0 lightgray, 0 -1px lightgray;
  }
      
  ${createNumbers()}
`

function createNumbers(){
    let styles = '';

    for (let i = 0; i <= 5; i++){
        styles += `
              &:nth-child(${i}) .col:first-child::before {
                content: '${i}';
              }
        `
    }

    return css`${styles}`;
}
