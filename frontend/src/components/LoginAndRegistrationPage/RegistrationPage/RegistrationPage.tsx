import React from "react";
import {ErrorMessage, Field, Formik} from "formik";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {validateConfirmPassword, validateEmail, validatePassword, validateUsername} from "../validators";
import {FormContainer} from "../styles/FormStyle";
import {useAppDispatch} from "../../../Store/store";
import {register} from "../../../Store/features/auth/authSlice";

const RegistrationPage: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', repeatPassword: '' }}
            validate={values => {
                const errors: any = {};
                errors.username = validateUsername(values.username);
                errors.email = validateEmail(values.email);
                errors.password = validatePassword(values.password);
                errors.repeatPassword = validateConfirmPassword(values.password, values.repeatPassword);

                // without this, errors contains keys with empty string which should not be considered errors
                Object.keys(errors).forEach(key => {
                    if (!errors[key]) {
                        delete errors[key];
                    }
                });
                return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
                dispatch(register(values));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <FormContainer className="mt-2 p-5">
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Nazwa użytkownika</label><br />
                                <Field className="form-control" type="text" name="username" id='rusername' />
                                <ErrorMessage name="username" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Email</label><br />
                                <Field className="form-control" type="email" name="email" id="remail" />
                                <ErrorMessage name="email" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Hasło</label><br />
                                <Field className="form-control" type="password" name="password" id='rpassword' />
                                <ErrorMessage name="password" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Powtórz hasło</label><br />
                                <Field className="form-control" type="password" name="repeatPassword" id='rrepeatPassword' />
                                <ErrorMessage name="repeatPassword" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>

                        <Row className="mt-4 d-flex justify-content-center">
                            <Col sm={12} className="d-flex justify-content-center mb-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{ minWidth: 100, backgroundColor: '#023535', border: 'none' }}
                                >
                                    {isSubmitting ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                        />
                                    ) : (
                                        <span>Zarejestruj</span>
                                    )}
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
