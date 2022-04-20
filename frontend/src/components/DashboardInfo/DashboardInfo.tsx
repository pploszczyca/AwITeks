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
        <Row className="d-flex justify-content-center mt-3">
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Przegapione akcje</InfoElement>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Nadchodzące akcje</InfoElement>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Wiadomości</InfoElement>
            </Col>
        </Row>
    );
}

export default DashboardInfo;
