import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser as faUser } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const PageTitle = styled.h1`
  color: #0FC2C0;
`;

function SiteTitleAndIcons() {
    return (
        <Container className="mt-5" >
            <Row>
                <Col xs={10}>
                    <PageTitle>Witaj, XYZ!</PageTitle>
                </Col>
                <Col xs={2}>
                    <Row style={{ fontSize: 32 }}>
                        <Col xs={4}>
                            <FontAwesomeIcon icon={faBell} />
                        </Col>
                        <Col xs={4}>
                            <FontAwesomeIcon icon={faUser} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SiteTitleAndIcons;
