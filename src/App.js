import React, { Component } from 'react';
import Router from '../src/navigation/index.js';
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Store/store';
// import dotenv from 'dotenv';
// dotenv.config();

class App extends Component {

    render() {
        return (
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router />
                </PersistGate>
            </ReduxProvider>
        );
    }
}

export default App;