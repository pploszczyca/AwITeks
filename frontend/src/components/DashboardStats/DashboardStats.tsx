import React from 'react';
import { Col, Row } from "react-bootstrap";
import { StatsCard } from "./DashboardStatsStyle";
import { getApis } from "../../api/initializeApis";
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';

const DashboardStats: React.FC<{}> = () => {
    const { data: plantsStatsResp, isLoading } = useQuery(['plants-summary', 'stats'], () => getApis().plantsApi.getPlantsStats());
    if (isLoading) {
        return <Loader />;
    }

    const plantsStats = plantsStatsResp!.data;

    return (
        <Row className="d-flex justify-content-center">
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCard>
                    <p className="card-title">Liczba dodanych roślin</p>
                    <p className="stat">{plantsStats?.totalPlants}</p>
                    <br />
                </StatsCard>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCard>
                    <p className="card-title">Liczba zadbanych roślin</p>
                    <p className="stat">{plantsStats?.neglectedPlants}</p>
                    <p className="details"> Gratulacje! <br /> Twoje rośliny wyglądają na zadbane.</p>
                </StatsCard>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCard>
                    <p className="card-title">Liczba zaniedbanych roślin</p>
                    <p className="stat">{plantsStats?.wellGroomedPlants}</p>
                    <p className="details">Musisz lepiej dbać o niektóre rośliny.</p>
                </StatsCard>
            </Col>
        </Row>
    );
}

export default DashboardStats;
