import React from 'react';
import {useQuery} from "react-query";
import {getApis} from "../../api/initializeApis";
import {errorMsg} from "../../utils/constants";
import {InfoElement, MobileRow, StatsCol} from './DashboardInfoStyle';
import StatsList from "./StatsList";
import {Col} from "react-bootstrap";
import {activitiesOrganizer, forumThreadsOrganizer} from "./statsDataOrganizer";


const DashboardInfo: React.FC<{}> = () => {
    let { data: summaryLists, isLoading: summaryListsLoading } =
        useQuery(
            ['users', 'userMainSummary'],
            () => getApis().userApi.getUserMainSummary().then(resp => resp.data),
            {onError: (error) => errorMsg()}
        );

    return (
        <MobileRow className="d-flex justify-content-center mt-3">
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCol>
                    <InfoElement>Przegapione akcje</InfoElement>
                    <StatsList stats={activitiesOrganizer(summaryLists?.missedActivities)}/>
                </StatsCol>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCol>
                    <InfoElement>Nadchodzące akcje</InfoElement>
                    <StatsList stats={activitiesOrganizer(summaryLists?.incomingActivities)}/>
                </StatsCol>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCol>
                    <InfoElement>Wiadomości</InfoElement>
                    <StatsList stats={forumThreadsOrganizer(summaryLists?.forumThreads)}/>
                </StatsCol>
            </Col>
        </MobileRow>
    );
}

export default DashboardInfo;
