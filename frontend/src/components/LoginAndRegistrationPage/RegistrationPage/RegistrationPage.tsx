import React from "react";
import {ErrorMessage, Formik, Field} from "formik";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {validateConfirmPassword, validateEmail, validatePassword} from "../validators";
import {FormContainer} from "../styles/FormStyle";

const RegistrationPage: React.FC<{}> = () => {
    return (
        <Formik
            initialValues={{username: '', email: '', password: '', repeatPassword: ''}}
            validate={values => {
                const errors: any = {};
                if (!values.username) errors.username = 'Wymagane';
                errors.email = validateEmail(values.email);
                errors.password = validatePassword(values.password);
                errors.repeatPassword = validateConfirmPassword(values.password, values.repeatPassword);
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                // todo: register system
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <FormContainer className="mt-2 p-5">
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Nazwa użytkownika</label><br />
                                <Field className="form-control" type="text" name="username" id='username'/>
                                <ErrorMessage name="username" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>
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
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Powtórz hasło</label><br />
                                <Field className="form-control" type="password" name="repeatPassword" id='repeatPassword'/>
                                <ErrorMessage name="repeatPassword" component="div">
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
                                        <span>Zarejestruj</span>
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default RegistrationPage;
