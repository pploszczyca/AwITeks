import React from 'react';
import Loader from "../Loader/Loader";
import cactusDancing from "./resources/dance-dancing-cat.gif"
import {Container, Col} from "react-bootstrap";
import {StatsRow} from "./DashboardInfoStyle";

const StatsList: React.FC<{ stats: any }> = ({stats}) => {
    return (
        <>
            {stats ? (
                <>
                    {stats.length === 0 ? (
                        <>
                            <strong className='text-center pb-2'>Na razie jest cicho...</strong>
                            <img src={cactusDancing} alt={'dancing cactus'}/>
                        </>
                    ) : (
                        <Container style={{height: "100%"}} className='p-0'>
                            {stats.map((stat: any, idx: any) => (
                                <StatsRow key={idx} style={{height: "19%"}}>
                                    {Object.keys(stat).map((key, idx) => (
                                        <Col key={idx}>
                                            <p className='p-0 m-0'>{stat[key]}</p>
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
