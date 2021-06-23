import React, {useEffect} from "react";
import companyLogo from '../../../img/companylogo.png'
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../product/store/getProductSlice";

function FinalInvoice(props){
    const products = useSelector(store => store.Product.getProduct.product);
    const totalAmount = products?.map(item => item.total);

    let total = 0;
    for (let i = 0; i < totalAmount?.length; i++)
    {
        total += totalAmount[i];
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, []);
    return(
        <>
            <div className="container">
                <div className="card" style={{marginTop:'20px'}}>
                    <div className="card-header">
                        <img src={companyLogo} alt="Company Logo"/>

                    </div>
                    <div className="card-header">
                        Invoice Start Date :
                         <strong> 01/01/2018</strong>
                        <span className="" style={{right:'20px' , marginTop:'0'}}>  Invoice Due Date :
                         <strong> 01/01/2018</strong></span>

                    </div>
                    <div className="card-body">
                        <div className="row mb-4">
                            <div className="col-sm-6">
                                <h6 className="mb-3">Billing Address:</h6>
                                <div>
                                    <strong>Webz Poland</strong>
                                </div>
                                <div>Madalinskiego 8</div>
                                <div>71-101 Szczecin, Poland</div>
                                <div>Email: info@webz.com.pl</div>
                                <div>Phone: +48 444 666 3333</div>
                            </div>

                            <div className="col-sm-6">
                                <h6 className="mb-3">Shipping Address:</h6>
                                <div>
                                    <strong>Bob Mart</strong>
                                </div>
                                <div>Attn: Daniel Marek</div>
                                <div>43-190 Mikolow, Poland</div>
                                <div>Email: marek@daniel.com</div>
                                <div>Phone: +48 123 456 789</div>
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
                            <button type="submit" className="btn btn-primary">Download PDF</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FinalInvoice