import React, {useState} from "react";
import Sidebar from "../main/sidebarDetails/Sidebar";
import Route from "./Route";
import {Switch} from "react-router-dom";

import Company from "../main/company/Company";

function Content() {
    const [sidebar, setSidebar] = useState(true);
    const activeStatus = (status) => {
        setSidebar(status);
    }
    return (
        <>
            <div className="w-full">
                <Sidebar sidebarActiveStatus={activeStatus}/>
                <div className="justify-content-end d-flex" style={{marginLeft: sidebar ? 250 : 0}}>
                    <Switch>
                        <Route path="/company" exact={true} component={Company}/>

                        <Route component={Company}/>
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default Content;