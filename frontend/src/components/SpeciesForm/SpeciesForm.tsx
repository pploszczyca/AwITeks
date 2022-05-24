import React from 'react';
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AddSpeciesRequestBody, Species } from "../../api";
import { getApis } from "../../api/initializeApis";
import { useMutation, useQueryClient } from 'react-query';
import {toast} from 'react-toastify';
import { fertilizationToString, insolationToString } from '../../utils/util';


type SpeciesFormProps = {
    show: boolean
    hide: () => void;
};

export const SpeciesForm: React.FC<SpeciesFormProps> = ({ show, hide }) => {
    const queryClient = useQueryClient();
    const addSpeciesMutation = useMutation((species: AddSpeciesRequestBody) => getApis().speciesApi.addSpecies(species),
        {
            onSuccess: (species) => {
                queryClient.setQueryData(['species', species.data?.creatorId], species.data);
                queryClient.setQueryData('species',
                    (oldSpecies: Species[] | undefined) => oldSpecies ? [...oldSpecies, species?.data] : [species?.data]);
            },
            onError: (error) => {
                toast.error("Kurza twarz! Coś poszło nie tak :/", {autoClose: 8000})
            }
        });

    const emptySpecies: AddSpeciesRequestBody = {
        name: '',
        maxAge: 0,
        neededInsolation: "LOW",
        waterDose: 0,
        waterRoutine: 1,
        fertilizationRoutine: 1,
        fertilizationDose: "LOW"
    };

    return (
        <Modal show={show} onHide={hide} animation={false} size="xl">
            <Modal.Header>
                <Modal.Title>
                    Dodaj nowy gatunek
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={emptySpecies}
                    validate={values => {
                        const errors: any = {};
                        if (!values.name) errors.name = 'Wymagane';
                        if (values.maxAge === 0) errors.maxAge = 'Wartość powinna być dodatnia';
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await addSpeciesMutation.mutateAsync(values);
                            toast.success("Dodano gatunek");
                            hide()
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row>
                                    <Col className="form-group mt-3" xl={6} sm={12}>
                                        <label>Nazwa gatunku:</label><br />
                                        <Field className="form-control" type="text" name="name" />
                                        <ErrorMessage name="name" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={6} sm={12}>
                                        <label>Max długość życia:</label><br />
                                        <Field className="form-control" type="number" min={0} name="maxAge" />
                                        <ErrorMessage name="maxAge" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Ilość wody w jednym podlaniu (ml):</label><br />
                                        <Field className="form-control" type="number" min={0} name="waterDose" />
                                        <ErrorMessage name="waterDose" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Częstość podlewania (dni):</label><br />
                                        <Field className="form-control" type="number" min={1} name="waterRoutine" />
                                        <ErrorMessage name="waterRoutine" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Ilość potrzebnej ziemi w jednym nawożeniu:</label><br />
                                        <Field className="form-control" as="select" name="fertilizationDose">
                                            <option value="LOW">{fertilizationToString("LOW")}</option>
                                            <option value="MEDIUM">{fertilizationToString("MEDIUM")}</option>
                                            <option value="HIGH">{fertilizationToString("HIGH")}</option>
                                        </Field>
                                        <ErrorMessage name="fertilizationDose" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={6} md={12}>
                                        <label>Częstość nawożenia (dni):</label><br />
                                        <Field className="form-control" type="number" min={1} name="fertilizationRoutine" />
                                        <ErrorMessage name="fertilizationRoutine" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                        </ErrorMessage>
                                    </Col>

                                    <Col className="form-group mt-3" xl={12}>
                                        <label>Potrzebny poziom nasłonecznienia:</label>
                                        <Field className="form-control" as="select" name="neededInsolation">
                                            <option value="LOW">{insolationToString("LOW")}</option>
                                            <option value="MEDIUM">{insolationToString("MEDIUM")}</option>
                                            <option value="HIGH">{insolationToString("HIGH")}</option>
                                        </Field>
                                        <ErrorMessage name="neededInsolation" component="div">
                                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
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
    )
}
