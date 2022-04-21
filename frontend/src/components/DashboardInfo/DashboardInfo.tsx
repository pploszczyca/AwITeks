import React from 'react';
import {Col} from "react-bootstrap";
import {MobileRow, InfoElement} from "./DashboardInfoStyle";


function DashboardInfo() {
    return (
        <MobileRow className="d-flex justify-content-center mt-3">
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Przegapione akcje</InfoElement>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Nadchodzące akcje</InfoElement>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Wiadomości</InfoElement>
            </Col>
        </MobileRow>
    );
}

export default DashboardInfo;
