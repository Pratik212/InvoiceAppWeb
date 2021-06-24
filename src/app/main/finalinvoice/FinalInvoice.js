import React, {useEffect} from "react";
import companyLogo from '../../../img/companylogo.png'
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../product/store/getProductSlice";
import { PDFExport } from "@progress/kendo-react-pdf";

function FinalInvoice(props){
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
    for (let i = 0; i < totalAmount?.length; i++)
    {
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
    return(
        <>
            <div className="container">
                <PDFExport
                    ref={pdfExportComponent}
                    paperSize="auto"
                    margin={40}
                    fileName={`Report for ${new Date().getFullYear()}`}
                    author="KendoReact Team"
                >
                <div className="card" style={{marginTop:'20px'}}>
                    <div className="card-header">
                        <img src={companyLogo} alt="Company Logo"/>

                    </div>
                    <div className="card-header">
                        Invoice Date :
                         <strong> {resultInvoice.invoiceStartDate}</strong>
                    </div>
                    <div className="card-body">
                        <div className="row mb-4">
                            <div className="col-sm-6">
                                <h6 className="mb-3">Billing Address:</h6>
                                <div>
                                    <strong>Company Name</strong> : {resultBilling.companyName}
                                </div>
                                <div><strong>Contact Name</strong> : {resultBilling.contactName}</div>
                                <div><strong>Address</strong> : {resultBilling.address}</div>
                                <div><strong>Email</strong> : {resultBilling.email}</div>
                                <div><strong>Phone</strong> : {resultBilling.phoneNumber}</div>
                            </div>

                            <div className="col-sm-6">
                                <h6 className="mb-3">Shipping Address:</h6>
                                <div>
                                    <strong>Department Name</strong> : {resultShipping.departmentName}
                                </div>
                                <div><strong>Client Company</strong> : {resultShipping.clientCompany}</div>
                                <div><strong>Address</strong> : {resultShipping.address}</div>
                                <div><strong>Phone Number</strong> : {resultShipping.phoneNumber}</div>
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
                                </tr>
                                </thead>
                                {products?.map((item , index) =>{
                                    console.log("item" , item.total)
                                    return(
                                        <>
                                            <tbody>
                                            <tr>
                                                <td className="center">{index + 1}</td>
                                                <td className="left strong">{item.description}</td>
                                                <td className="left">{item.qty}</td>

                                                <td className="right">{item.unitPrice}</td>
                                                <td className="center">{item.total}</td>
                                            </tr>
                                            </tbody>
                                        </>
                                        )

                                })}

                            </table>
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