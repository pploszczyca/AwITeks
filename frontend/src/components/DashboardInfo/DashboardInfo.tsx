import React from 'react';
import {useQuery} from "react-query";
import {getApis} from "../../api/initializeApis";
import {errorMsg} from "../../utils/constants";
import {InfoElement, MobileRow, StatsCol} from './DashboardInfoStyle';
import StatsList from "./StatsList";
import {Col} from "react-bootstrap";
import {activitiesOrganizer, forumThreadsOrganizer} from "./statsDataOrganizer";


const DashboardInfo: React.FC<{}> = () => {
    let { data: summaryLists } =
        useQuery(
            ['users', 'userMainSummary'],
            () => getApis().userApi.getUserMainSummary().then(resp => resp.data),
            {onError: (error) => errorMsg()}
        );

    const ColContent = (content: string, action: any) => {
        return (
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <StatsCol>
                    <InfoElement>{content}</InfoElement>
                    <StatsList stats={action}/>
                </StatsCol>
            </Col>
        )
    }

    return (
        <MobileRow className="d-flex justify-content-center mt-3">
            {ColContent("Przegapione akcje", activitiesOrganizer(summaryLists?.missedActivities))}
            {ColContent("Nadchodzące akcje", activitiesOrganizer(summaryLists?.incomingActivities))}
            {ColContent("Wiadomości", forumThreadsOrganizer(summaryLists?.forumThreads))}
        </MobileRow>
    );
}

export default DashboardInfo;
