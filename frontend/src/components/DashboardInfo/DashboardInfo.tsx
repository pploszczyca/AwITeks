import React from 'react';
import {Col} from "react-bootstrap";
import {InfoElement, MobileRow} from "./DashboardInfoStyle";
import {useQuery} from "react-query";
import {getApis} from "../../api/initializeApis";
import {errorMsg} from "../../utils/constants";


const DashboardInfo: React.FC<{}> = () => {
    let { data: summaryLists, isLoading: summaryListsLoading } =
        useQuery(
            ['users', 'userMainSummary'],
            () => getApis().userApi..then(resp => resp.data),
            {onError: (error) => errorMsg()}
        );

    return (
        <MobileRow className="d-flex justify-content-center mt-3">
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Przegapione akcje</InfoElement>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Nadchodzące akcje</InfoElement>
            </Col>
            <Col xxl={4} sm={6} xs={12} className="mt-2">
                <InfoElement>Wiadomości</InfoElement>
            </Col>
        </MobileRow>
    );
}

export default DashboardInfo;
