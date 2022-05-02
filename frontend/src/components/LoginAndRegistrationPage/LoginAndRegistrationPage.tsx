import React from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import LoginPage from "./LoginPage/LoginPage";
import {Content, PillItem} from "./LoginAndRegistrationStyle";

const LoginAndRegistrationPage: React.FC<{}> = () => {
    return (
        <Content>
            <Row>
                <Col lg={5} className='text-center d-flex justify-content-center flex-column'>
                    <h1>Witaj w najlepszej aplikacji do monitorowania stanu roślin.</h1>
                    <h4>Dołącz do nas i powierz nam swoje rośliny.</h4>
                </Col>
                <Col lg={7} id='sign-form'>
                    <Tab.Container id="pills-tabs" defaultActiveKey='login'>
                        <Row className='justify-content-center mt-5'>
                            <Col lg={6}>
                                <Nav variant='pills' className='flex-row nav-justified'>
                                    <PillItem>
                                        <Nav.Link eventKey="login">Logowanie</Nav.Link>
                                    </PillItem>
                                    <PillItem>
                                        <Nav.Link eventKey="registration">Rejestracja</Nav.Link>
                                    </PillItem>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Tab.Content>
                                <Tab.Pane eventKey="login">
                                    <LoginPage/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="registration">
                                    hello
                                </Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>

        </Content>
    );
};

export default LoginAndRegistrationPage;
