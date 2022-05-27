import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import PlantsView from "../PlantsView/PlantsView";
import Sidebar from "../Sidebar/Sidebar";
import {Col, Container, Row} from "react-bootstrap";
import SiteTitleAndIcons from "../SiteTitleAndIcons/SiteTitleAndIcons";
import Calendar from "../Calendar/Calendar";
import PlantDetailsView from '../PlantDetailsView/PlantDetailsView';
import {QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';
import LoginAndRegistrationPage from "../LoginAndRegistrationPage/LoginAndRegistrationPage";
import {PageGuard} from '../PageGuard/PageGuard';
import {Role} from '../../utils/roles';
import {PageRoutes} from '../../utils/constants';
import {queryClient} from '../../Store/store';
import ForumThreadPage from "../ForumThread/ForumThreadPage";
import Forum from "../Forum/Forum"


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
                        <Col xs={10} style={{ height: "80vh", width: "100vw" }}>
                            <Routes>
                                <Route path="" element={<PageGuard role={Role.LOGGED_IN}><Dashboard /></PageGuard>} />
                                <Route path={PageRoutes.LOGIN} element={<PageGuard role={Role.NOT_LOGGED_IN}><LoginAndRegistrationPage /></PageGuard>} />
                                <Route path={PageRoutes.DASHBOARD} element={<PageGuard role={Role.LOGGED_IN}><Dashboard /></PageGuard>} />
                                <Route path={PageRoutes.MY_PLANTS} element={<PageGuard role={Role.LOGGED_IN}><PlantsView /></PageGuard>} />
                                <Route path={PageRoutes.CALENDAR} element={<PageGuard role={Role.LOGGED_IN}><Calendar /></PageGuard>} />
                                <Route path={`${PageRoutes.MY_PLANTS}/:plantId`} element={<PageGuard role={Role.LOGGED_IN}><PlantDetailsView /></PageGuard>} />
                                <Route path={PageRoutes.FORUM} element={<PageGuard role={Role.LOGGED_IN}><Forum/></PageGuard>} />
                                
                                {/*TODO: add PageGuard*/}
                                <Route path={`${PageRoutes.FORUM_THREAD}`} element={<ForumThreadPage />} />

                                <Route path="*" element={<NotFound />} />
                            </Routes>

                        </Col>
                    </Router>
                </Row>
            </Container>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
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
