import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from "./store";
import * as serviceWorker from './serviceWorker';
import App from "./App";
import Auth from "./app/auth/Auth";
import {Router} from "react-router";
import AppContext from './AppContext';
import routes from "./app/fuse-configs/routesConfig";
import history from './@history/@history'

ReactDOM.render(
    <AppContext.Provider
        value={{
            routes
        }}
    >
        <Provider store={store}>
            <Auth>
                <Router history={history}>
                    <App />
                </Router>
            </Auth>
        </Provider>
    </AppContext.Provider>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();