import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import './reset.css';
import './index.scss';
import App from './App';
import store from './redux/store';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ErrorBoundary>
                    <App/>
                </ErrorBoundary>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>, document.getElementById('root')
);