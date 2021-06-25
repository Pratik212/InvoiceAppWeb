import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addProduct} from "./store/productSlice";
import {getProductById} from './store/getProductByIdSlice';
import './Product.css'
import {useParams} from "react-router";
import {updateProduct} from "./store/updateProductSlice";
import {useHistory} from "react-router-dom";
import {Flip, toast} from "react-toastify";
import Toaster from "../toaster/Toaster";

function Product() {
    const history = useHistory()
    const [productData, setProductData] = useState({})
    const [initialValues, setInitialValues] = useState(
        {
            description: "" || productData.description,
            qty: 0 || productData.qty,
            unitPrice: 0 || productData.unitPrice
        }
    );
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();

    const submitForm = () => {
        const data = {
            id: params.id,
            description: formValues.description || productData.description,
            qty: formValues.qty || productData.qty,
            unitPrice: formValues.unitPrice || productData.unitPrice,
            total: formValues.qty * formValues.unitPrice || productData.qty * productData.unitPrice,
            subTotal: formValues.qty * formValues.unitPrice || productData.qty * productData.unitPrice
        }

        if (params.id) {
            dispatch(updateProduct(data)).then(res => {
                console.log("res::::" , res.payload.message)
                if (res.payload) {
                    toast(res.payload.message, {
                        transition: Flip
                    });
                    setTimeout(() => {
                        history.goBack();
                    },5000);
                }
            }, [])

        } else {
            dispatch(addProduct(data)).then(res => {
                if (res.payload) {
                    toast("Product successfully add.", {
                        transition: Flip
                    });
                    setTimeout(() => {
                        history.push({
                            pathname: '/finalInvoice'
                        })
                    }, 5000)
                }

            })
        }

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        setProductData({...productData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setFormErrors(validate(productData));
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
        const id = params.id;
        if (id) {
            dispatch(getProductById(id)).then(res => {
                if (res.payload) {
                    setProductData(res.payload);
                }
            });
        }

    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>{params.id ? "Edit Product" : "Add Product"}</h3>
                </div>
                <hr style={{marginTop: '20px'}}/>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group"
                         style={{marginTop: '20px', marginBottom: formErrors.description ? '30px' : '10px'}}>
                        <label htmlFor="exampleInputEmail1">Description</label>
                        <input type="text" className="form-control" name="description"
                               value={productData ? productData.description : formValues.description}
                               onChange={handleChange}/>
                        {formErrors.description && (
                            <span style={{color: "red"}} className="error">{formErrors.description}</span>
                        )}
                    </div>

                    <div className="form-group"
                         style={{marginTop: '20px', marginBottom: formErrors.clientCompany ? '30px' : '10px'}}>
                        <label htmlFor="exampleInputEmail1">Qty</label>
                        <input type="number" className="form-control" name="qty"
                               value={productData ? productData.qty : formValues.qty}
                               onChange={handleChange}/>
                        {formErrors.qty && (
                            <span style={{color: "red"}} className="error">{formErrors.qty}</span>
                        )}
                    </div>

                    <div className="form-group"
                         style={{marginTop: '20px', marginBottom: formErrors.unitPrice ? '30px' : '10px'}}>
                        <label htmlFor="exampleInputEmail1">Unit Price</label>
                        <input type="number" className="form-control" name="unitPrice"
                               value={productData ? productData.unitPrice : formValues.unitPrice}
                               onChange={handleChange}/>
                        {formErrors.unitPrice && (
                            <span style={{color: "red"}} className="error">{formErrors.unitPrice}</span>
                        )}

                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Total</label>
                        <input type="number" className="form-control" name="total"
                               value={productData ? productData.qty * productData.unitPrice : formValues.qty * formValues.unitPrice}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Sub Total</label>
                        <input type="number" className="form-control" name="subTotal"
                               value={productData ? productData.qty * productData.unitPrice : formValues.qty * formValues.unitPrice}
                        />
                    </div>

                    <button type="submit" className="btn-pdt btn-primary">{params.id ? "Update" : "Submit"}</button>
                </form>
                <Toaster/>
            </div>
        </>
    )
}

export default Product