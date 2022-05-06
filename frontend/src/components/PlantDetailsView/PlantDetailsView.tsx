import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import Calendar from '../Calendar/Calendar';
import { DetailsWrapper, InfoWrapper, TitleSeparator, RequirementsButton } from './PlantDetailsViewStyles';
import { ContentContainer } from "../App/AppStyle";
import { getApis } from "../../api/initializeApis";
import { Notes } from "../Notes/Notes";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from '../Loader/Loader';
import { EditPlantForm } from '../EditPlantForm/EditPlantForm';
import { toast } from 'react-toastify';
import { fertilizationToString, insolationToString } from '../../utils/util';
import { PageRoutes } from '../../utils/constants';


const PlantDetailsView: React.FC<{}> = (props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { plantId } = useParams();
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [showEditPlantForm, setShowEditPlantForm] = useState(false);

    if (plantId == null) {
        navigate(PageRoutes.MY_PLANTS)
    }

    const { data: plantResp, isLoading } = useQuery(['plants', plantId], async () => getApis().plantsApi.getPlant(+plantId!))
    const deletePlantMutation = useMutation(async () => {
        await getApis().plantsApi.removePlant(+plantId!);
        toast.success("Usunięto roślinę");
        navigate(PageRoutes.MY_PLANTS)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['plants', plantId]);
            queryClient.invalidateQueries(['plants-summary', plantId]);
        }
    });

    if (isLoading || deletePlantMutation.isLoading) {
        return <Loader />;
    }

    const plant = plantResp!.data;
    if (plant == null) {
        navigate(PageRoutes.MY_PLANTS)
    }

    return (
        <>
            <ContentContainer fluid className="mt-3">
                <Row>
                    <Col xxl={6}>
                        <Card as={DetailsWrapper}>
                            <Card.Img variant="top" src={plant.url} />
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
                                    <span className="d-block">Obecny pozion nasłonecznienia: {insolationToString(plant.actualInsolation)}</span>
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
                                    <span className="d-block">Wymagane nasłonecznienie: {insolationToString(plant.species.neededInsolation)}</span>
                                    <span className="d-block">Częstotliwość podlewania: {plant.species.waterRoutine} / tydzień</span>
                                    <span className="d-block">Zalecana ilość wody: {plant.species.waterDose}l</span>
                                    <span className="d-block">Częstotliwość nawożenia: {plant.species.fertilizationRoutine} / miesiąc</span>
                                    <span className="d-block">Intensywność nawożenia: {fertilizationToString(plant.species.fertilizationDose)}</span>
                                </Card.Text>

                                <div className="d-flex justify-content-center">
                                    <RequirementsButton
                                        className="mb-1"
                                        onClick={() => setShowNoteForm(true)}
                                    >
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
                                    <RequirementsButton
                                        className="mb-1"
                                        onClick={() => setShowEditPlantForm(true)}
                                    >
                                        Edytuj roślinę
                                    </RequirementsButton>

                                    <RequirementsButton
                                        className="mb-1"
                                        variant="danger"
                                        onClick={() => deletePlantMutation.mutate()}
                                        disabled={deletePlantMutation.isLoading}
                                    >
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

            <Notes
                showNoteForm={showNoteForm}
                hide={() => setShowNoteForm(false)}
                plant={plant}
            />

            <EditPlantForm
                show={showEditPlantForm}
                setShowPlantForm={setShowEditPlantForm}
                plant={plant}
            />
        </>
    )
}

export default PlantDetailsView;
