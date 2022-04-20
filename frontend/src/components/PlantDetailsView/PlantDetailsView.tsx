import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { mockPlants } from '../../utils/mockData';
import Calendar from '../Calendar/Calendar';
import { DetailsWrapper, InfoWrapper, TitleSeparator } from './PlantDetailsViewStyles';
import {ContentContainer} from "../App/AppStyle";

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
                                    <div>Średnia długość życia gautnku: {plant.species.maxAge}</div>
                                    <div>Wymagane nasłonecznienie: {plant.species.neededInsolation}</div>
                                    <div>Częstotliwość podlewania: {plant.species.waterRoutine} / tydzień</div>
                                    <div>Zalecana ilość wody: {plant.species.waterDose}l</div>
                                    <div>Częstotliwość nawożenia: {plant.species.fertilizationRoutine} / miesiąc</div>
                                    <div>Intensywność nawożenia: {plant.species.fertilizationDose}</div>
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
                                    <div>Obecny pozion nasłonecznienia: {plant.actualInsolation}</div>
                                    <div>Data ostatniego podlania: 24.01.2022</div>
                                    <div>Data ostatnieno nawożenia: 26.12.2021</div>
                                </Card.Text>
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
