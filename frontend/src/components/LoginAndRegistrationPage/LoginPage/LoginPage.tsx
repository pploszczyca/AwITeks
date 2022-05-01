import React from "react";
import {ErrorMessage, Formik, Field} from "formik";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {LoginContainer} from "./LoginStyle";

const LoginPage: React.FC<{}> = () => {
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validate={values => {
                const errors: any = {};
                if (!values.email) errors.email = 'Wymagane';
                if (!values.password) errors.password = 'Wymagane';
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                // todo: login system
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <LoginContainer className="mt-2 p-5">
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Email</label><br />
                                <Field className="form-control" type="email" name="email" id="email"/>
                                <ErrorMessage name="email" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Hasło</label><br />
                                <Field className="form-control" type="password" name="password" id='password'/>
                                <ErrorMessage name="password" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>

                        <Row className="mt-4 d-flex justify-content-center">
                            <Col sm={12} className="d-flex justify-content-center mb-2">
                                <Button type="submit" disabled={isSubmitting} style={{ minWidth: 100, backgroundColor: '#023535', border: 'none'}}>
                                    {isSubmitting ?
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                        />
                                        :
                                        <span>Zaloguj</span>
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </LoginContainer>
                </Form>
            )}
        </Formik>
    );
};

export default LoginPage;
