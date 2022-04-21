import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import {mockPlantTypes} from "../../utils/mockData";
import {NotificationSeverity} from "../../utils/CalendarNotification";
import Moment from 'moment';
import {SpeciesForm} from "../SpeciesForm/SpeciesForm";


type PlantFormProps = {
    plantId?: number  // will be used to edit the details of the plant
    show: boolean
    updateState: any
    formTitle?: string
};

export const PlantForm: React.FC<PlantFormProps> = ({plantId, show, updateState, formTitle= "Dodaj nową roślinę"}) => {
    let [showSpeciesForm, setShowSpeciesForm] = useState(false);

    const [plantTypes,] = useState(() => {
        // fetch from API
        return mockPlantTypes;
    })

    const [insolationLevels, ] = useState(() => {
        return NotificationSeverity;
    })

    function updateShowSpeciesFormState(newValue: boolean){
        setShowSpeciesForm(newValue);
        updateState(!newValue);
    }

    function addToDatabase(values: FormikValues, setSubmitting: any){
        // todo
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }

    return(
        <>
            <Modal show={show} onHide={() => updateState(false)} animation={false} size="xl">
                <Modal.Header>
                    <Modal.Title>
                        {formTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            scientificPlantName: '', userPlantName: '', photo: '', species: '', lastWatering: Moment().format("yyyy-MM-DD"),
                            insolationLevel: '', lastFertilization: Moment().format("yyyy-MM-DD"), note: ''
                        }}
                        validate={values => {
                            const errors: any = {};
                            if (!values.scientificPlantName) errors.scientificPlantName = 'Wymagane';
                            if(!values.userPlantName) errors.userPlantName = 'Wymagane';
                            if(!values.photo) errors.photo = 'Wymagane';
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
                                        <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                            <label>Nazwa naukowa rośliny:</label><br/>
                                            <Field className="form-control" type="text" name="scientificPlantName" />
                                            <ErrorMessage name="scientificPlantName" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                            <label>Twoja nazwa rośliny:</label><br/>
                                            <Field className="form-control" type="text" name="userPlantName" />
                                            <ErrorMessage name="userPlantName" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={12}>
                                            <label>Zdjęcie:</label><br/>
                                            <Field className="form-control" type="file" name="photo" />
                                            <ErrorMessage name="photo" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={8} md={6} sm={12}>
                                            <label>Gatunek:</label><br/>
                                            <Field className="form-control" as="select" name="species">
                                                {plantTypes.map((plantType, id) => (
                                                    <option key={plantType + id} value={plantType}>{plantType}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="species" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                            <label>Nie widzisz odpowiedniego gatunku?</label><br/>
                                            <Button variant="info" onClick={() => updateShowSpeciesFormState(true)}>Dodaj nowy gatunek</Button>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                            <label>Ostatnie nawodnienie:</label>
                                            <Field className="form-control" type="date" name="lastWatering"/>
                                            <ErrorMessage name="lastWatering" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                            <label>Ostatnie nawożenie:</label>
                                            <Field className="form-control" type="date" name="lastFertilization" />
                                            <ErrorMessage name="lastFertilization" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={12}>
                                            <label>Poziom nasłonecznienia:</label>
                                            <Field className="form-control" as="select" name="insolationLevel">
                                                <option value={insolationLevels.LOW}>{insolationLevels.LOW}</option>
                                                <option value={insolationLevels.MEDIUM}>{insolationLevels.MEDIUM}</option>
                                                <option value={insolationLevels.HIGH}>{insolationLevels.HIGH}</option>
                                            </Field>
                                            <ErrorMessage name="insolationLevel" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={12}>
                                            <label>Notatka (opcjonalnie):</label>
                                            <Field className="form-control" as="textarea" name="note"/>
                                            <ErrorMessage name="note" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4 d-flex justify-content-center">
                                        <Col sm={12} className="d-flex justify-content-center mb-2">
                                            <Button variant="success" type="submit" disabled={isSubmitting}>
                                                Dodaj nową roślinę
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
            <SpeciesForm show={showSpeciesForm} updateState={updateShowSpeciesFormState}/>
        </>
    )
}
