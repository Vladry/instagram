import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';   // reset CSS  https://material-ui.com/ru/components/css-baseline/
import Container from '@material-ui/core/Container'; //берем Material UI контейнер для глобального центрирования
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import store from './redux/store';

import './reset.css';
import './index.scss';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AppRouts from "./AppRouts";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <CssBaseline>
                    <ErrorBoundary>
                        <Container align='center'>
                            <AppRouts/>
                        </Container>
                    </ErrorBoundary>
                </CssBaseline>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>, document.getElementById('root')
);