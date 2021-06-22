import "./App.css";
import React from "react";
import {BrowserRouter} from 'react-router-dom';
import Content from "./app/routes/index";

function App() {
    return (
        <BrowserRouter >
            <div className="w-100" >
                <Content/>
            </div>
        </BrowserRouter>
    );
}

export default App;