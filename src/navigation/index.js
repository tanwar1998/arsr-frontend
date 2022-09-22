import React from 'react';
import {
//   BrowserRouter,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard/index.jsx";
// import Client from "../pages/Client/index.jsx";
// import AboutUS from "../pages/AboutUS/index.jsx";
// import Gallery from "../pages/Gallery/index.jsx";
// import Navbar from '../specificComponents/navbar/index.jsx';
// import FooterContainer from '../specificComponents/footer/index.jsx';
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