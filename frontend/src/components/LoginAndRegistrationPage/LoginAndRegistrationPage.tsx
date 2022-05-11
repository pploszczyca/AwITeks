import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import LoginPage from "./LoginPage/LoginPage";
import { Content, PillItem } from "./styles/LoginAndRegistrationStyle";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { clearAuthErrors } from "../../Store/features/auth/authSlice";

const LoginAndRegistrationPage: React.FC<{}> = () => {
    const { errors } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    return (
        <Content>
            <Row>
                <Col lg={5} id='welcome-text' className='text-center d-flex justify-content-center flex-column'>
                    <h1>Witaj w najlepszej aplikacji do monitorowania stanu roślin.</h1>
                    <h4>Dołącz do nas i powierz nam swoje rośliny.</h4>
                </Col>
                <Col lg={7} id='sign-form'>
                    <Tab.Container id="pills-tabs" defaultActiveKey='login'>
                        <Row className='justify-content-center mt-5'>
                            <Col lg={6}>
                                <Nav variant='pills' className='flex-row nav-justified'>
                                    <PillItem>
                                        <Nav.Link
                                            onClick={() => dispatch(clearAuthErrors())}
                                            eventKey="login"
                                        >
                                            Logowanie
                                        </Nav.Link>
                                    </PillItem>

                                    <PillItem>
                                        <Nav.Link
                                            onClick={() => dispatch(clearAuthErrors())}
                                            eventKey="registration"
                                        >
                                            Rejestracja
                                        </Nav.Link>
                                    </PillItem>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Tab.Content>
                                <Tab.Pane eventKey="login">
                                    <LoginPage />
                                </Tab.Pane>
                                <Tab.Pane eventKey="registration">
                                    <RegistrationPage />
                                </Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>
            {/* TODO proper error displaying */}
            {errors && errors.map((err, idx) =>
                <p key={idx} style={{ color: "red" }}>{err}</p>
            )}
        </Content>
    );
};

export default LoginAndRegistrationPage;
