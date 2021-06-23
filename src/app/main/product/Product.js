import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "./store/productSlice";
import {getProduct} from "./store/getProductSlice";

function Product() {
    const history = useHistory();
    const [initialValues, setInitialValues] = useState(
        {description: "", qty: 0, unitPrice: 0}
    );
    const products = useSelector(store => store.Product.getProduct.product);
    console.log(":::products:::", products)
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const submitForm = () => {
        const data = {
            description: formValues.description,
            qty: formValues.qty,
            unitPrice: formValues.unitPrice,
            total: formValues.qty * formValues.unitPrice,
            subTotal: formValues.qty * formValues.unitPrice
        }

        dispatch(addProduct(data)).then(res => {
            if (res.payload) {
                setInitialValues("")
                history.push({
                    pathname: '/product',
                    state: {shippingData: data}
                })
            }

        })
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const validate = (values) => {
        let errors = {};
        if (!values.description) {
            errors.description = "Description is required!";
        }
        if (!values.qty) {
            errors.qty = "qtyis required!";
        }
        if (!values.unitPrice) {
            errors.unitPrice = "UnitPrice is required!";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    useEffect(() => {
        dispatch(getProduct())
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>Product Details</h3>
                </div>
                <hr style={{marginTop: '20px'}}/>

                <table className="table table-bordered  table-striped table-info table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Description</th>
                        <th scope="col">Qty</th>
                        <th scope="col">UnitPrice</th>
                        <th scope="col">Total</th>
                    </tr>
                    </thead>
                    {products?.map(item => {
                        return (
                            <>
                                <tbody>
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.description}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.total}</td>
                                </tr>
                                </tbody>
                            </>
                        )
                    })}

                </table>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group"
                         style={{marginTop: '20px', marginBottom: formErrors.description ? '30px' : '10px'}}>
                        <label htmlFor="exampleInputEmail1">Description</label>
                        <input type="text" className="form-control" name="description" value={formValues.description}
                               onChange={handleChange}/>
                        {formErrors.description && (
                            <span style={{color: "red"}} className="error">{formErrors.description}</span>
                        )}
                    </div>

                    <div className="form-group"
                         style={{marginTop: '20px', marginBottom: formErrors.clientCompany ? '30px' : '10px'}}>
                        <label htmlFor="exampleInputEmail1">Qty</label>
                        <input type="number" className="form-control" name="qty" value={formValues.qty}
                               onChange={handleChange}/>
                        {formErrors.qty && (
                            <span style={{color: "red"}} className="error">{formErrors.qty}</span>
                        )}
                    </div>

                    <div className="form-group"
                         style={{marginTop: '20px', marginBottom: formErrors.unitPrice ? '30px' : '10px'}}>
                        <label htmlFor="exampleInputEmail1">Unit Price</label>
                        <input type="number" className="form-control" name="unitPrice" value={formValues.unitPrice}
                               onChange={handleChange}/>
                        {formErrors.unitPrice && (
                            <span style={{color: "red"}} className="error">{formErrors.unitPrice}</span>
                        )}

                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Total</label>
                        <input type="number" className="form-control" name="total"
                               value={formValues.qty * formValues.unitPrice}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Sub Total</label>
                        <input type="text" className="form-control" name="subTotal"
                               value={formValues.qty * formValues.unitPrice}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </>
    )
}

export default Product