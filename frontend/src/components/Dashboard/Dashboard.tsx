import React from "react";
import {Container} from "react-bootstrap";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardInfo from "../DashboardInfo/DashboardInfo";


function Dashboard() {
    return (
        <Container className="mt-4">
            <DashboardStats/>
            <DashboardInfo/>
        </Container>
    )
}

export default Dashboard;
