import React, {useEffect, useState} from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import {emptyPlant} from '../../utils/mockData';
import Calendar from '../Calendar/Calendar';
import { DetailsWrapper, InfoWrapper, TitleSeparator, RequirementsButton } from './PlantDetailsViewStyles';
import { ContentContainer } from "../App/AppStyle";
import {PlantForm} from "../AddPlantForm/PlantForm";
import {Plant} from "../../api";
import {getApis} from "../../api/initializeApis";
import {Notes} from "../Notes/Notes";


const PlantDetailsView: React.FC<{}> = (props) => {
    const { plantId } = useParams();
    const navigate = useNavigate();
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [showEditPlantForm, setShowEditPlantForm] = useState(false);

    if (plantId == null) {
        navigate("/my_plants");
    }

    const [plant, updatePlant] = useState<Plant>(emptyPlant);
    useEffect(() => {
        const getPlant = async () => {
            try {
                const plantRequest = await getApis().plantsApi.getPlant(parseInt(plantId!));
                const plant: Plant = plantRequest.data as Plant;
                updatePlant(plant)

            } catch (err) {
                console.log('Server error:');
                console.log(err);
            }
        }

        getPlant();
    }, [])

    function deletePlant(){
        try {
            getApis().plantsApi.removePlant(parseInt(plantId!));
            navigate("/my_plants");
        } catch (err) {
            console.log('Server error:');
            console.log(err);
        }
    }


    return (
        <>
            <ContentContainer fluid className="mt-3">
                <Row>
                    <Col xxl={6}>
                        <Card as={DetailsWrapper}>
                            {/*todo: jak już będzie poprawiony Plant to zamienić na plant.url*/}
                            <Card.Img variant="top" src="https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg" />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 26 }}>Informacje ogólne</Card.Title>
                                <TitleSeparator />

                                <Card.Text>
                                    <span className="d-block">Nazwa rośliny: {plant!.name}</span>
                                    <span className="d-block">Gatunek: {plant!.spiece!.name}</span>
                                    <span className="d-block">Średnia długość życia gatunku: {plant!.spiece!.maxAge}</span>
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
                                <Card.Title style={{ fontSize: 26 }}>Wymagania</Card.Title>
                                <TitleSeparator />

                                <Card.Text>
                                    <span className="d-block">Wymagane nasłonecznienie: {plant!.spiece!.neededInsolation}</span>
                                    <span className="d-block">Częstotliwość podlewania: {plant!.spiece!.waterRoutine} / tydzień</span>
                                    <span className="d-block">Zalecana ilość wody: {plant!.spiece!.waterDose}l</span>
                                    <span className="d-block">Częstotliwość nawożenia: {plant!.spiece!.fertilizationRoutine} / miesiąc</span>
                                    <span className="d-block">Intensywność nawożenia: {plant!.spiece!.fertilizationDose}</span>
                                </Card.Text>

                                <div className="d-flex justify-content-center">
                                    <RequirementsButton className="mb-1" onClick = {() => setShowNoteForm(true)}>
                                        Notatki
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
            <Notes showNoteForm={showNoteForm} showNoteFormSetter={setShowNoteForm} plant={plant!}/>
            <PlantForm show={showEditPlantForm} updateState={setShowEditPlantForm} formTitle={`Edycja rośliny: ${plant.name}`} plantId={parseInt(plantId!)}/>
        </>
    )
}

export default PlantDetailsView;
