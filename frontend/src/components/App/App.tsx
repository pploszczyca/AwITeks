import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import PlantsView from "../PlantsView/PlantsView";
import Sidebar from "../Sidebar/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import SiteTitleAndIcons from "../SiteTitleAndIcons/SiteTitleAndIcons";
import Calendar from "../Calendar/Calendar";
import PlantDetailsView from '../PlantDetailsView/PlantDetailsView';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Container fluid>
                <Row>
                    <Router>
                        <SiteTitleAndIcons />
                        <Col xs={2}>
                            <Sidebar />
                        </Col>
                        <Col xs={10}>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/my-plants" element={<PlantsView />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/my-plants/:plantId" element={<PlantDetailsView />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>

                        </Col>
                    </Router>
                </Row>
            </Container>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </QueryClientProvider>
    );
}

export default App;
