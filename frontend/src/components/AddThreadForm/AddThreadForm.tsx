import React from "react";
import {Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";


type AddThreadFormProps = {
    show: boolean;
    setShowThreadForm: React.Dispatch<React.SetStateAction<boolean>>;
};


export const AddThreadForm: React.FC<AddThreadFormProps> = ({ show, setShowThreadForm }) => {
    return (
        <Modal show={show} onHide={() => setShowThreadForm(false)} animation={false} size="xl">
            <Modal.Header>
                <Modal.Title>
                    Załóż nowy temat.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{threadTitle: '', firstMsg: ''}}
                    validate={values => {
                        const errors: any = {};
                        if (!values.threadTitle) errors.threadTitle = 'Wymagane';
                        if (!values.firstMsg) errors.firstMsg = 'Wymagane';
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            toast.success("Nowy temat dodany pomyślnie!");
                            setShowThreadForm(false);
                        } catch (err) {
                            // TODO display this
                            console.log("failed to submit");
                            console.log(err);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row>
                                    <Col className="form-group mt-3" xl={12}>
                                        <label>Tytuł tematu:</label><br />
                                        <Field className="form-control" type="text" name="threadTitle" />
                                        <ErrorMessage name="threadTitle" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={12}>
                                        <label>Twoja wiadomość:</label>
                                        <Field className="form-control" as="textarea" name="firstMsg" />
                                        <ErrorMessage name="firstMsg" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>
                                </Row>

                                <Row className="mt-4 d-flex justify-content-center">
                                    <Col sm={12} className="d-flex justify-content-center mb-2">
                                        <Button variant="success" type="submit" disabled={isSubmitting} style={{ minWidth: 80 }}>
                                            {isSubmitting ?
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                />
                                                :
                                                <span>Załóż temat</span>
                                            }
                                        </Button>
                                    </Col>

                                    <Col sm={12} className="d-flex justify-content-center">
                                        <Button variant="danger" onClick={() => setShowThreadForm(false)} >
                                            Anuluj
                                        </Button>
                                    </Col>
                                </Row>

                            </Container>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}
