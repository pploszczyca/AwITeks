import React from 'react';
import Loader from "../Loader/Loader";
import {Col, Container, Row} from "react-bootstrap";
import {StatsRow} from "./DashboardInfoStyle";

const StatsList: React.FC<{ stats: any }> = ({stats}) => {
    console.log(stats)
    return (
        <>
            {stats ? (
                <>
                    {stats.length === 0 ? (
                        <p>Na razie jest cicho...</p>
                    ) : (
                        <Container style={{height: "100%"}}>
                            {stats.map((stat: any, idx: any) => (
                                <StatsRow key={idx} style={{height: "20%"}}>
                                    {Object.keys(stat).map((key, idx) => (
                                        <Col key={idx}>
                                            {stat[key]}
                                        </Col>
                                    ))}
                                </StatsRow>
                            ))}
                        </Container>
                    )}
                </>
            ) : (
                <Loader/>
            )}
        </>
    );
}

export default StatsList;
