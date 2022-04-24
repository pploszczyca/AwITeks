import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { mockPlants } from '../../utils/mockData';
import Calendar from '../Calendar/Calendar';
import { DetailsWrapper, InfoWrapper, TitleSeparator, RequirementsButton } from './PlantDetailsViewStyles';
import { ContentContainer } from "../App/AppStyle";
import {PlantForm} from "../AddPlantForm/PlantForm";
import {Notes} from "../Notes/Notes";


function personalRequirements(){}

function deletePlant(){}

const PlantDetailsView: React.FC<{}> = (props) => {
    const { plantId } = useParams();
    const navigate = useNavigate();
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [showEditPlantForm, setShowEditPlantForm] = useState(false);

    if (plantId == null) {
        navigate("/my_plants");
    }

    const [plant] = useState(() => {
        return mockPlants.find(plant => plant.id === +(plantId!)) || mockPlants[0];
    });


    return (
        <>
            <ContentContainer fluid className="mt-3">
                <Row>
                    <Col xxl={6}>
                        <Card as={DetailsWrapper}>
                            <Card.Img variant="top" src={plant.imgUrl} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 26 }}>Informacje ogólne</Card.Title>
                                <TitleSeparator />

                                <Card.Text>
                                    <span className="d-block">Nazwa rośliny: {plant.name}</span>
                                    <span className="d-block">Gatunek: {plant.species.name}</span>
                                    <span className="d-block">Średnia długość życia gatunku: {plant.species.maxAge}</span>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                        
                    </Col>

                    <Col xxl={6}>
                        <Card as={InfoWrapper}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: 26 }}>Stan rośliny</Card.Title>
                                <TitleSeparator />
                                <Card.Text>
                                    <span className="d-block">Obecny pozion nasłonecznienia: {plant.actualInsolation}</span>
                                    <span className="d-block">Data ostatniego podlania: 24.01.2022</span>
                                    <span className="d-block">Data ostatnieno nawożenia: 26.12.2021</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card as={DetailsWrapper}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: 26 }}>Wymagania podstawowe</Card.Title>
                                <TitleSeparator />

                                <Card.Text>
                                    <span className="d-block">Wymagane nasłonecznienie: {plant.species.neededInsolation}</span>
                                    <span className="d-block">Częstotliwość podlewania: {plant.species.waterRoutine} / tydzień</span>
                                    <span className="d-block">Zalecana ilość wody: {plant.species.waterDose}l</span>
                                    <span className="d-block">Częstotliwość nawożenia: {plant.species.fertilizationRoutine} / miesiąc</span>
                                    <span className="d-block">Intensywność nawożenia: {plant.species.fertilizationDose}</span>
                                </Card.Text>

                                <div className="d-flex justify-content-center flex-column flex-sm-row">
                                    <RequirementsButton className="mb-1" onClick = {() => setShowNoteForm(true)}>
                                        Notatki
                                    </RequirementsButton>
                                    <RequirementsButton className="mb-1" onClick = {() => personalRequirements()}>
                                        Własne wymagania
                                    </RequirementsButton>
                                </div>

                            </Card.Body>
                        </Card>
                        <Card as={DetailsWrapper}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: 26 }}>Zarządzanie rośliną</Card.Title>
                                <TitleSeparator />
                                <div className="d-flex justify-content-center flex-column flex-sm-row">
                                    <RequirementsButton className="mb-1" onClick = {() => setShowEditPlantForm(true)}>
                                        Edytuj roślinę
                                    </RequirementsButton>
                                    <RequirementsButton className="mb-1" variant="danger" onClick = {() => deletePlant()}>
                                        Usuń roślinę
                                    </RequirementsButton>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Calendar plantId={+plantId!} variant='small' />
                </Row>
            </ContentContainer >
            <Notes showNoteForm={showNoteForm} showNoteFormSetter={setShowNoteForm} plant={plant}/>
            <PlantForm show={showEditPlantForm} updateState={setShowEditPlantForm} formTitle={`Edycja rośliny: ${plant.name}`} plantId={plant.id}/>
        </>
    )
}

export default PlantDetailsView;
