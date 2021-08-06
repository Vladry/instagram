import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import store from './redux/store';

import './reset.css';
import './index.scss';
import App from './App';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AppRouts from "./AppRouts";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ErrorBoundary>
                    <AppRouts/>
                </ErrorBoundary>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>, document.getElementById('root')
);