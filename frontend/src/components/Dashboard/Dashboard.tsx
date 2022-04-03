import React from "react";
import {Container, Col, Row} from "react-bootstrap";
import DashboardStats from "../DashboardStats/DashboardStats";


function Dashboard() {
    return (
        <Container className="mt-4">
            <DashboardStats/>
        </Container>
    )
}

export default Dashboard;
