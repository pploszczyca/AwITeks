import React from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import {Plant} from "../../utils/Plant";


type NotesFormProps = {
    showNoteForm: boolean
    showNoteFormSetter: any
    plant: Plant
};

export const NotesForm: React.FC<NotesFormProps> = ({showNoteForm, showNoteFormSetter, plant}) => {
    function addNoteToDb(values: FormikValues, setSubmitting: any){
        // todo
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }

    return(
        <Modal show={showNoteForm} onHide={() => showNoteFormSetter(false)} animation={false} size="xl">
            <Modal.Header>
                <Modal.Title>
                    Twoje notatki
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        note: plant.note
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        addNoteToDb(values, setSubmitting);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row>
                                    <Col>
                                        <label>Notatka:</label><br/>
                                        <Field className="form-control" as="textarea" name="note"/>
                                        <ErrorMessage name="note" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-4 d-flex justify-content-center">
                                    <Col sm={12} className="d-flex justify-content-center mb-2">
                                        <Button variant="success" type="submit" disabled={isSubmitting}>
                                            Zapisz notatkę
                                        </Button>
                                    </Col>
                                    <Col sm={12} className="d-flex justify-content-center">
                                        <Button variant="danger" onClick={() => showNoteFormSetter(false)}>
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
