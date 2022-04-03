import React from 'react';
import {Row, Col} from "react-bootstrap";
import styled from "styled-components";

let InfoElement = styled.div`
  height: 60vh;
  background-color: #EBEBEB;
  text-align: center;
  font-size: 20px;
  padding-top: 20px;
`

function DashboardInfo() {
    return (
        <Row className="mt-4">
            <Col>
                <InfoElement>Przegapione akcje</InfoElement>
            </Col>
            <Col>
                <InfoElement>Nadchodzące akcje</InfoElement>
            </Col>
            <Col>
                <InfoElement>Wiadomości</InfoElement>
            </Col>
        </Row>
    );
}

export default DashboardInfo;
