import React from "react";
import {ErrorMessage, Field, Formik} from "formik";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {FormContainer} from "../styles/FormStyle";
import {validateEmail} from "../validators";
import {useAppDispatch, useAppSelector} from "../../../Store/store";
import {login} from "../../../Store/features/auth/authSlice";
import {REQUIRED} from "../../../utils/constants";

const LoginPage: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const { isFetching } = useAppSelector(state => state.auth);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors: any = {};
                errors.email = validateEmail(values.email);
                if (!values.password) errors.password = REQUIRED;
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
            }}
        >
            {({ values }) => (
                <Form>
                    <FormContainer className="mt-2 p-5">
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Email</label><br />
                                <Field className="form-control" type="email" name="email" id="email" />
                                <ErrorMessage name="email" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className="form-group mt-3" lg={6} sm={12}>
                                <label>Hasło</label><br />
                                <Field className="form-control" type="password" name="password" id='password' />
                                <ErrorMessage name="password" component="div">
                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                        </Row>

                        <Row className="mt-4 d-flex justify-content-center">
                            <Col sm={12} className="d-flex justify-content-center mb-2">
                                <Button
                                    disabled={isFetching}
                                    style={{ minWidth: 100, backgroundColor: '#023535', border: 'none' }}
                                    onClick={() => {
                                        dispatch(login(values));
                                    }}
                                >
                                    {isFetching ?
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
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default LoginPage;
