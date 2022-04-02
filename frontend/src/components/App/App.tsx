import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import PlantsView from "../PlantsView/PlantsView";
import Sidebar from "../Sidebar/Sidebar";


function App() {
    return (
        <div className="App">
            <Sidebar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/my_plants" element={<PlantsView/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
