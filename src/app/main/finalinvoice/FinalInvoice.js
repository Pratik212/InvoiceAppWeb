import React, {useEffect, useState} from "react";
import companyLogo from '../../../img/companylogo.png'
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../product/store/getProductSlice";
import {deleteProduct} from "../product/store/deleteProductSlice";
import {PDFExport} from "@progress/kendo-react-pdf";
import {useHistory} from "react-router-dom";

function FinalInvoice(props) {
    const history = useHistory()
    const products = useSelector(store => store.Product.getProduct.product);
    const totalAmount = products?.map(item => item.total);
    const billing = localStorage.getItem("billing");
    const shipping = localStorage.getItem("shipping");
    const invoice = localStorage.getItem("invoice");
    const resultBilling = JSON.parse(billing);
    const resultShipping = JSON.parse(shipping);
    const resultInvoice = JSON.parse(invoice);
    const pdfExportComponent = React.useRef(null);

    let total = 0;
    for (let i = 0; i < totalAmount?.length; i++) {
        total += totalAmount[i];
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, []);


    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const updateProduct = (id) => {
        history.push({
            pathname: `product/${id}`
        })
    }

    const deleteProducts = (index) => {
        dispatch(deleteProduct(index.id)).then(res => {
            dispatch(getProduct());
        });
    }
    return (
        <>
            <div className="container">
                <PDFExport
                    ref={pdfExportComponent}
                    paperSize="auto"
                    margin={40}
                    fileName={`Report for ${new Date().getFullYear()}`}
                    author="KendoReact Team"
                >
                    <div className="card" style={{marginTop: '20px'}}>
                        <div className="card-header">
                            <img src={companyLogo} alt="Company Logo"/>

                        </div>
                        <div className="card-header">
                            Invoice No :
                            <strong> {resultInvoice.invoiceNo}</strong>
                            <span className="" style={{right: '20px', marginTop: '0'}}>  Invoice Date :
                         <strong>{resultInvoice.invoiceStartDate}</strong></span>
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <h6 className="mb-3">Billing Address:</h6>
                                    <div className="text-capitalize">
                                        <strong>Company Name</strong> : {resultBilling.companyName}
                                    </div>
                                    <div className="text-capitalize"><strong>Contact
                                        Name</strong> : {resultBilling.contactName}</div>
                                    <div className="text-capitalize"><strong>Address</strong> : {resultBilling.address}
                                    </div>
                                    <div className=""><strong>Email</strong> : {resultBilling.email}</div>
                                    <div className="text-capitalize">
                                        <strong>Phone</strong> : {resultBilling.phoneNumber}</div>
                                </div>

                                <div className="col-sm-6">
                                    <h6 className="mb-3">Shipping Address:</h6>
                                    <div className="text-capitalize">
                                        <strong>Department Name</strong> : {resultShipping.departmentName}
                                    </div>
                                    <div className="text-capitalize"><strong>Client
                                        Company</strong> : {resultShipping.clientCompany}</div>
                                    <div className="text-capitalize"><strong>Address</strong> : {resultShipping.address}
                                    </div>
                                    <div className="text-capitalize"><strong>Phone
                                        Number</strong> : {resultShipping.phoneNumber}</div>
                                </div>

                            </div>

                            <div className="table-responsive-sm">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="center">#</th>
                                        <th>Description</th>
                                        <th className="right">Unit Cost</th>
                                        <th className="center">Qty</th>
                                        <th className="right">Total</th>
                                        <th className="right">Action</th>
                                    </tr>
                                    </thead>
                                    {products?.map((item, index) => {
                                        return (
                                            <>
                                                <tbody>
                                                <tr>
                                                    <td className="center">{index + 1}</td>
                                                    <td className="left text-capitalize strong">{item.description}</td>
                                                    <td className="left">{item.qty}</td>

                                                    <td className="right">{item.unitPrice}</td>
                                                    <td className="right">{item.total}</td>
                                                    <td className="left">
                                                        <div className="row">
                                                            <div style={{marginLeft: '20px'}}
                                                                 onClick={() => updateProduct(item.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                     height="16"
                                                                     fill="currentColor" className="bi bi-pencil-fill"
                                                                     viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                                </svg>
                                                            </div>
                                                            <div style={{marginLeft: '20px'}} onClick={() => {
                                                                if (window.confirm('Are you sure you wish to delete this item?')) deleteProducts(item)
                                                            }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                     height="16"
                                                                     fill="currentColor" className="bi bi-trash-fill"
                                                                     viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </>
                                        )
                                    })}
                                </table>
                                {products?.length === undefined &&
                                <h5 style={{alignItems: 'center', justifyContent: "center", display: 'flex'}}>Product
                                    Not Found</h5>
                                }
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-sm-5">
                                </div>

                                <div className="col-lg-4 col-sm-5 ml-auto">
                                    <table className="table table-clear">
                                        <tbody>
                                        <tr>
                                            <td className="left">
                                                <strong>Subtotal</strong>
                                            </td>
                                            <td className="right">{total}</td>
                                        </tr>
                                        {/*<tr>*/}
                                        {/*    <td className="left">*/}
                                        {/*        <strong>Discount (20%)</strong>*/}
                                        {/*    </td>*/}
                                        {/*    <td className="right">$1,699,40</td>*/}
                                        {/*</tr>*/}
                                        {/*<tr>*/}
                                        {/*    <td className="left">*/}
                                        {/*        <strong>VAT (10%)</strong>*/}
                                        {/*    </td>*/}
                                        {/*    <td className="right">$679,76</td>*/}
                                        {/*</tr>*/}
                                        <tr>
                                            <td className="left">
                                                <strong>Total</strong>
                                            </td>
                                            <td className="right">
                                                <strong>{total}</strong>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>
                    </div>
                </PDFExport>
                <button onClick={exportPDFWithComponent} type="submit" className="btn btn-primary">Download PDF</button>
            </div>
        </>
    )
}

export default FinalInvoice