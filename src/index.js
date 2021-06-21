import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContext from './AppContext';
import Routes from './app/routes/index';
import {Router} from "react-router-dom";
import history from './@history';
import routes from "./app/fuse-configs/routesConfig";
import { Provider } from 'react-redux';
import store from "./store";
import Auth from "./app/auth/Auth";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <AppContext.Provider
        value={{
            routes
        }}
    >
        <Provider store={store}>
            <Auth>
                <Router history={history}>
                    <Routes />
                </Router>
            </Auth>
        </Provider>
    </AppContext.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();