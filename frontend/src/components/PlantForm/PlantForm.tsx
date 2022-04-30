import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getApis } from "../../api/initializeApis";
import { AddPlantRequestBody } from "../../api";
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { SpeciesForm } from '../SpeciesForm/SpeciesForm';
import { toast } from 'react-toastify';


type PlantFormProps = {
    show: boolean;
    setShowPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
    formTitle: string;
    initialValues: AddPlantRequestBody;
    onSubmit: (values: AddPlantRequestBody) => Promise<any>;
    acceptBtnText: string;
    successToastText: string;
};



export const PlantForm: React.FC<PlantFormProps> =
    ({ initialValues, show, setShowPlantForm, formTitle, onSubmit, acceptBtnText, successToastText }) => {
        const [showSpeciesForm, setShowSpeciesForm] = useState(false);
        const { data: speciesList, isLoading } = useQuery('species', () => getApis().speciesApi.getAllSpecies().then(resp => resp.data));

        if (isLoading) {
            return <Loader></Loader>;
        }

        const toggleSpeciesForm = () => {
            setShowSpeciesForm((showSpeciesForm) => !showSpeciesForm);
            setShowPlantForm((formVisibility) => !formVisibility);
        };

        const hide = () => {
            setShowPlantForm(false);
            setShowSpeciesForm(false);
        };

        return (
            <>
                <Modal show={show} onHide={hide} animation={false} size="xl">
                    <Modal.Header>
                        <Modal.Title>
                            {formTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={initialValues}
                            validate={values => {
                                const errors: any = {};
                                if (!values.name) errors.userPlantName = 'Wymagane';
                                // if (!values.) errors.photo = 'Wymagane';
                                return errors;
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await onSubmit(values);
                                    toast.success(successToastText);
                                    hide();
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
                                            <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                                <label>Twoja nazwa rośliny:</label><br />
                                                <Field className="form-control" type="text" name="name" />
                                                <ErrorMessage name="userPlantName" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col className="form-group mt-3" xl={4} md={12}>
                                                <label>Zdjęcie:</label><br />
                                                {/*{plant.imgUrl === '' ?*/}
                                                {/*    (   <>*/}
                                                {/*            <Field className="form-control" type="file" name="photo" accept="image/png, image/jpeg"/>*/}
                                                {/*            <ErrorMessage name="photo" component="div">*/}
                                                {/*                { msg => <div style={{ color: 'red' }}>{msg}</div> }*/}
                                                {/*            </ErrorMessage>*/}
                                                {/*        </>*/}
                                                {/*    )*/}
                                                {/*    :*/}
                                                {/*    (*/}
                                                {/*        <>*/}
                                                {/*            <div className="d-flex gap-1 align-items-center">*/}
                                                {/*                <img id="plantPhoto" src={plant.imgUrl} alt="" width={64} height={64}/>*/}
                                                {/*                <Field id="photoInput" className="form-control" type="file"  accept="image/png, image/jpeg" name="edit-photo" onChange={() => displayPhoto()}/>*/}
                                                {/*            </div>*/}
                                                {/*        </>*/}
                                                {/*    )*/}
                                                {/*}*/}
                                                <Field className="form-control" type="text" name="photo" />
                                                <ErrorMessage name="photo" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col className="form-group mt-3" xl={8} md={6} sm={12}>
                                                <label>Gatunek:</label><br />
                                                <Field className="form-control" as="select" name="speciesId">
                                                    {speciesList!.map(specie => (
                                                        <option key={specie.id} value={specie.id}>{specie.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="species" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                                <label>Nie widzisz odpowiedniego gatunku?</label><br />
                                                <Button variant="info" onClick={toggleSpeciesForm}>Dodaj nowy gatunek</Button>
                                            </Col>

                                            <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                                <label>Ostatnie nawodnienie:</label>
                                                <Field className="form-control" type="date" name="lastWateringDate" />
                                                <ErrorMessage name="lastWatering" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col className="form-group mt-3" xl={4} md={6} sm={12}>
                                                <label>Ostatnie nawożenie:</label>
                                                <Field className="form-control" type="date" name="lastFertilizationDate" />
                                                <ErrorMessage name="lastFertilization" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col className="form-group mt-3" xl={4} md={12}>
                                                <label>Poziom nasłonecznienia:</label>
                                                <Field className="form-control" as="select" name="insolation">
                                                    <option value="LOW">niskie</option>
                                                    <option value="MEDIUM">średnie</option>
                                                    <option value="HIGH">wysokie</option>
                                                </Field>
                                                <ErrorMessage name="insolationLevel" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col className="form-group mt-3" xl={12}>
                                                <label>Notatka (opcjonalnie):</label>
                                                <Field className="form-control" as="textarea" name="note" />
                                                <ErrorMessage name="note" component="div">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </Col>
                                        </Row>

                                        <Row className="mt-4 d-flex justify-content-center">
                                            <Col sm={12} className="d-flex justify-content-center mb-2">
                                                <Button variant="success" type="submit" disabled={isSubmitting}>
                                                    {acceptBtnText}
                                                </Button>
                                            </Col>

                                            <Col sm={12} className="d-flex justify-content-center">
                                                <Button variant="danger" onClick={hide}>
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

                <SpeciesForm
                    show={showSpeciesForm}
                    hide={toggleSpeciesForm}
                />
            </>
        )
    }
