import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import PlantsView from "../PlantsView/PlantsView";


function App() {
    return (
        <div className="App">
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
