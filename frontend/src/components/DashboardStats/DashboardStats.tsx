import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {StatsCard} from "./DashboardStatsStyle";
import {getApis} from "../../api/initializeApis";
import {Plant, Species} from "../../api";
import {PlantSummary} from "../../utils/Plant";

function DashboardStats() {
    const [noPlants, setNoPlants] = useState(0);
    const [noNeglectedPlants, setNoNeglectedPlants] = useState(0);
    const [noWellGroomedPlants, setNoWellGroomedPlants] = useState(0);

    useEffect(() => {
        const getPlants = async () => {
            try {
                const plantRequest = await getApis().plantsApi.getAllPlants();
                const plants: Plant[] = plantRequest.data as Plant[];
                setNoPlants(plants.length)


            } catch (err) {
                console.log('brrrrrrrrrrrrrrrr is server running???');
                console.log(err);
            }
        }

        getPlants();
    })

    return (
        <Row className="d-flex justify-content-center">
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCard>
                    <p className="card-title">Liczba dodanych roślin</p>
                    <p className="stat">{noPlants}</p>
                    <br/>
                </StatsCard>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCard>
                    <p className="card-title">Liczba zadbanych roślin</p>
                    <p className="stat">6</p>
                    <p className="details"> Gratulacje! <br/> Twoje rośliny wyglądają na zadbane.</p>
                </StatsCard>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCard>
                    <p className="card-title">Liczba zaniedbanych roślin</p>
                    <p className="stat">1</p>
                    <p className="details">Musisz lepiej dbać o niektóre rośliny.</p>
                </StatsCard>
            </Col>
        </Row>
    );
}

export default DashboardStats;
