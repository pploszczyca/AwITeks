import React from 'react';
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";

let StatsCard = styled.div`
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


function DashboardStats() {
    return (
        <Row>
            <Col>
                <StatsCard>
                    <p className="card-title">Liczba dodanych roślin</p>
                    <p className="stat">7</p>
                    <br/>
                </StatsCard>
            </Col>
            <Col>
                <StatsCard>
                    <p className="card-title">Liczba zadbanych roślin</p>
                    <p className="stat">6</p>
                    <p className="details"> Gratulacje! <br/> Twoje rośliny wyglądają na zadbane.</p>
                </StatsCard>
            </Col>
            <Col>
                <StatsCard>
                    <p className="card-title">Liczba zaniedbanych roślin</p>
                    <p className="stat">1</p>
                    <p className="details">Musisz lepiej dbać o niektóre rośliny.</p>
                </StatsCard>
            </Col>
        </Row>
    );
}

export default DashboardStats;
