import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard/index.jsx";
import ToastifyComponent from '../components/Toastify';

export default function App() {
    return(
        <Router>
            <Routes >
                <Route path="/" element={<Dashboard/>} />
            </Routes>
            <ToastifyComponent/>
        </Router>
    )
};