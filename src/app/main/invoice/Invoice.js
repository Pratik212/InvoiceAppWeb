import React, {useEffect, useState} from "react";
import './Index.css'
import {prop} from "ramda";
import {useDispatch} from "react-redux";
import {addCompany} from "../company/store/companySlice";

function Invoice(props){
    const [initialValues , setInitialValues] = useState(
        { invoiceNo:"" , invoiceDate: "", invoiceDueDate: ""}
    )
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const submitForm = () => {
        const data = {
            invoiceNo : formValues.invoiceNo,
            invoiceDate : formValues.invoiceDate,
            invoiceDueDate : formValues.invoiceDueDate,

        }

        dispatch(addCompany(data)).then(res =>{
            if (res.payload){
                setInitialValues("")

            }

        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const validate = (values) => {
        let errors = {};
        if (!values.invoiceNo) {
            errors.invoiceNo = "Invoice number is required!";
        }
        if (!values.invoiceDate) {
            errors.invoiceDate = "Invoice Date is required!";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    return(
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>Invoice Details</h3>
                </div>
                <hr style={{marginTop:'20px'}}/>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.invoiceNo? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Invoice Number</label>
                        <input type="number" className="form-control" name="invoiceNo" value={formValues.invoiceNo}
                               onChange={handleChange}/>
                        {formErrors.invoiceNo && (
                            <span style={{color:"red"}} className="error">{formErrors.invoiceNo}</span>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Invoice