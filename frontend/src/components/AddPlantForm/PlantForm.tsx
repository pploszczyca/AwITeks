import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import {emptyPlant, mockPlants} from "../../utils/mockData";
import {NotificationSeverity} from "../../utils/CalendarNotification";
import {SpeciesForm} from "../SpeciesForm/SpeciesForm";
import Moment from "moment";
import {getApis} from "../../api/initializeApis";
import {ActivityActivityTypeEnum, Plant, Species} from "../../api";


type PlantFormProps = {
    plantId?: number  // will be used to edit the details of the plant
    show: boolean
    updateState: any
    formTitle?: string
};


function displayPhoto(){
    let img = document.getElementById('plantPhoto')!;
    let input: HTMLInputElement = document.getElementById('photoInput')! as HTMLInputElement;

    img.setAttribute("src", (window.URL ? URL : webkitURL).createObjectURL(input.files![0]));
}

export const PlantForm: React.FC<PlantFormProps> = ({plantId, show, updateState, formTitle= "Dodaj nową roślinę"}) => {
    let [showSpeciesForm, setShowSpeciesForm] = useState(false);
    const [plantTypes, setPlantTypes] = useState<Species[]>([]);
    const [insolationLevels, ] = useState(() => {
        return NotificationSeverity;
    })

    const [plant, updatePlant] = useState<Plant>(emptyPlant);

    // useEffect(() => {
    //     const getSpecies = async () => {
    //         try {
    //             const speciesRequest = await getApis().speciesApi.getAllSpecies();
    //             const species: Species[] = speciesRequest.data as Species[];
    //             console.log(species)
    //
    //             setPlantTypes(species)
    //         } catch (err) {
    //             console.log('brrrrrrrrrrrrrrrr is server running???');
    //             console.log(err);
    //         }
    //     }
    //
    //     getSpecies();
    // }, [])
    useEffect(() => {
        const getSpeciesAndPlant = async () => {
            try {
                const speciesRequest = await getApis().speciesApi.getAllSpecies();
                const species: Species[] = speciesRequest.data as Species[];
                // console.log(species)
                setPlantTypes(species)

                if(plantId !== undefined){
                    const plantRequest = await getApis().plantsApi.getPlant(plantId);
                    const plant: Plant = plantRequest.data as Plant;

                    updatePlant(plant)
                }

            } catch (err) {
                console.log('brrrrrrrrrrrrrrrr is server running???');
                console.log(err);
            }
        }

        getSpeciesAndPlant();
    }, [])


    function updateShowSpeciesFormState(newValue: boolean){
        setShowSpeciesForm(newValue);
        updateState(!newValue);
    }

    function addToDatabase(values: FormikValues, setSubmitting: any) {
        try {
            const plant: Plant = {
                name: values.userPlantName,
                actualInsolation: values.insolationLevel,
                note: values.note,
                plantActivities: [{
                    activityType: ActivityActivityTypeEnum.Watering,
                    date: values.lastWatering
                }, {
                    activityType: ActivityActivityTypeEnum.Fertilisation,
                    date: values.lastFertilization
                }]
                //,url: values.photo
            }
            getApis().plantsApi.addPlant(0, values.species, plant);
            updateState(false);
        } catch (err) {
            console.log('brrrrrrrrrrrrrrrr is server running???');
            console.log(err);
        }

        setSubmitting(false);
    }

    function getDate(plant: Plant, type: string){
        const dates = plant.plantActivities.filter(a => a.activityType === type)

        if(dates !== undefined && dates !== null){
            // console.log(dates.slice(-1))
            return  Moment(new Date(dates.slice(-1)[0].date)).format("yyyy-MM-DD");
        }

        return Moment(new Date()).format("yyyy-MM-DD");
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
                        initialValues={
                            {
                                userPlantName: plant.name,
                                photo: '', //plant.imgUrl,
                                species: '',
                                lastWatering: getDate(plant, "WATERING"),
                                insolationLevel: plant.actualInsolation,
                                lastFertilization: getDate(plant, "FERTILISATION"),
                                note: plant.note
                            }
                        }
                        validate={values => {
                            const errors: any = {};
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
                                            <label>Twoja nazwa rośliny:</label><br/>
                                            <Field className="form-control" type="text" name="userPlantName" />
                                            <ErrorMessage name="userPlantName" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={4} md={12}>
                                            <label>Zdjęcie:</label><br/>
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
                                            <Field className="form-control" type="text" name="photo"/>
                                            <ErrorMessage name="photo" component="div">
                                                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                                            </ErrorMessage>
                                        </Col>
                                        <Col className="form-group mt-3" xl={8} md={6} sm={12}>
                                            <label>Gatunek:</label><br/>
                                            <Field className="form-control" as="select" name="species">
                                                {plantTypes.map((plantName: Species, id) => (
                                                    <option key={id} value={plantName.id}>{plantName.name}</option>
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
