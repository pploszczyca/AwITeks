import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { mockPlants } from '../../utils/mockData';
import Calendar from '../Calendar/Calendar';
import { DetailsWrapper, InfoWrapper, TitleSeparator } from './PlantDetailsViewStyles';
import { ContentContainer } from "../App/AppStyle";


function edit_plant(){}

function add_note(){}

function personal_requirements(){}

const PlantDetailsView: React.FC<{}> = (props) => {
    const { plantId } = useParams();
    const navigate = useNavigate();

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
                                    <span className="d-block">Średnia długość życia gautnku: {plant.species.maxAge}</span>
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
                                <div style={{ flexDirection:"row"}}>
                                        <Button onClick = {() => edit_plant()} style={{justifyContent:'space-between', marginRight: 10}}>
                                            Edytuj roślinę
                                        </Button>
                                        <Button onClick = {() => add_note()} style={{justifyContent:'space-between', marginRight: 10}}>
                                            Dodaj notatkę
                                        </Button>
                                        <Button onClick = {() => personal_requirements()} style={{justifyContent:'space-between', marginRight: 10}}>
                                            Własne wymagania
                                        </Button>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Calendar plantId={+plantId!} variant='small' />
                </Row>
            </ContentContainer >
        </>
    )
}

export default PlantDetailsView;
