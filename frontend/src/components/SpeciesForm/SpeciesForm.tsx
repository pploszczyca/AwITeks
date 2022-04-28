import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import {NotificationSeverity} from "../../utils/CalendarNotification";
import {ActivityActivityTypeEnum, Plant, Species} from "../../api";
import {getApis} from "../../api/initializeApis";


type SpeciesFormProps = {
    show: boolean
    updateState: any
};

export const SpeciesForm: React.FC<SpeciesFormProps> = ({show, updateState}) => {
    const [insolationLevels, ] = useState(() => {
        return NotificationSeverity;
    })

    function addToDatabase(values: FormikValues, setSubmitting: any){
        try {
            const specie: Species = {
                id: Math.floor(Math.random() * (99999) + 1790),
                creatorId: 0,
                fertilizationDose: values.fertilizationDose,
                fertilizationRoutine: values.fertilizationRoutine,
                maxAge: values.maxAge,
                name: values.name,
                neededInsolation: values.neededInsolation,
                waterDose: values.waterDose,
                waterRoutine: values.waterRoutine
            }

            getApis().speciesApi.addSpecie(specie);
            updateState(false)
        } catch (err) {
            console.log('Server error:');
            console.log(err);
        }
        setSubmitting(false);
    }

    return(
        <Modal show={show} onHide={() => updateState(false)} animation={false} size="xl">
            <Modal.Header>
                <Modal.Title>
                    Dodaj nowy gatunek
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: '', maxAge: 0, neededInsolation: "LOW", waterDose: 0, waterRoutine: 1,
                        fertilizationRoutine: 1, fertilizationDose: "LOW"
                    }}
                    validate={values => {
                        const errors: any = {};
                        if (!values.name) errors.name = 'Wymagane';
                        if(values.maxAge === 0) errors.maxAge = 'Wartość powinna być dodatnia';
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        addToDatabase(values, setSubmitting);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row>
                                    <Col className="form-group mt-3" xl={6} sm={12}>
                                        <label>Nazwa gatunku:</label><br/>
                                        <Field className="form-control" type="text" name="name" />
                                        <ErrorMessage name="name" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="form-group mt-3" xl={6} sm={12}>
                                        <label>Max długość życia:</label><br/>
                                        <Field className="form-control" type="number" min={0} name="maxAge" />
                                        <ErrorMessage name="maxAge" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Ilość wody w jednym podlaniu (ml):</label><br/>
                                        <Field className="form-control" type="number" min={0} name="waterDose" />
                                        <ErrorMessage name="waterDose" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Częstość podlewania (dni):</label><br/>
                                        <Field className="form-control" type="number" min={1} name="waterRoutine" />
                                        <ErrorMessage name="waterRoutine" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Ilość potrzebnej ziemi w jednym nawożeniu:</label><br/>
                                        <Field className="form-control" as="select" name="fertilizationDose">
                                            <option value={insolationLevels.LOW}>{insolationLevels.LOW}</option>
                                            <option value={insolationLevels.MEDIUM}>{insolationLevels.MEDIUM}</option>
                                            <option value={insolationLevels.HIGH}>{insolationLevels.HIGH}</option>
                                        </Field>
                                        <ErrorMessage name="fertilizationDose" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Częstość nawożenia (dni):</label><br/>
                                        <Field className="form-control" type="number" min={1} name="fertilizationRoutine" />
                                        <ErrorMessage name="fertilizationRoutine" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="form-group mt-3" xl={12}>
                                        <label>Potrzebny poziom nasłonecznienia:</label>
                                        <Field className="form-control" as="select" name="neededInsolation">
                                            <option value={insolationLevels.LOW}>{insolationLevels.LOW}</option>
                                            <option value={insolationLevels.MEDIUM}>{insolationLevels.MEDIUM}</option>
                                            <option value={insolationLevels.HIGH}>{insolationLevels.HIGH}</option>
                                        </Field>
                                        <ErrorMessage name="neededInsolation" component="div">
                                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-4 d-flex justify-content-center">
                                    <Col sm={12} className="d-flex justify-content-center mb-2">
                                        <Button variant="success" type="submit" disabled={isSubmitting}>
                                            Dodaj nowy gatunek
                                        </Button>
                                    </Col>
                                    <Col sm={12} className="d-flex justify-content-center">
                                        <Button variant="danger" onClick={() => updateState(false)}>
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
