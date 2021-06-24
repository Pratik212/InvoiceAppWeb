import React, {useState} from "react";
import Sidebar from "../main/sidebarDetails/Sidebar";
import Route from "./Route";
import {Switch} from "react-router-dom";

import Company from "../main/company/Company";
import Invoice from "../main/invoice/Invoice";
import Billing from "../main/billing/Billing";
import Shipping from "../main/shipping/Shipping";
import Product from "../main/product/Product";
import FinalInvoice from "../main/finalinvoice/FinalInvoice";
import ProductList from "../main/productList/ProductList";

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
                        <Route path="/invoice" exact={true} component={Invoice}/>
                        <Route path="/billing" exact={true} component={Billing}/>
                        <Route path="/shipping" exact={true} component={Shipping}/>
                        <Route path="/product/new" exact={true} component={Product}/>
                        <Route path="/product/:id" exact={true} component={Product}/>
                        <Route path="/productList" exact={true} component={ProductList}/>
                        <Route path="/finalInvoice" exact={true} component={FinalInvoice}/>

                        <Route component={Company}/>
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default Content;