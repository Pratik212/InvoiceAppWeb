import React, {useEffect, useState} from "react";
import './Index.css'
import {useDispatch} from "react-redux";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {addInvoice} from "./store/invoiceSlice";
import {useHistory} from "react-router-dom";

function Invoice(){
    const history = useHistory();
    const [initialValues , setInitialValues] = useState(
        { invoiceNo:"" , invoiceStartDate: new Date()}
    )
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const dispatch = useDispatch();

    const submitForm = () => {
        const data = {
            invoiceNo : formValues.invoiceNo,
            invoiceStartDate : formValues.invoiceStartDate,
        }

        dispatch(addInvoice(data)).then(res =>{
            window.localStorage.setItem("invoice",JSON.stringify(data));
            if (res.payload){
                history.push({
                    pathname:'/billing'
                })
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
        if (!values.invoiceStartDate) {
            errors.invoiceDate = "Invoice Date is required!";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    const resetInvoice = () =>{
        window.localStorage.removeItem("invoice");
        setFormValues({
            invoiceNo:"",
            invoiceDate: "",
        });
    }

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
                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.invoiceStartDate? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Invoice Start Date</label>
                        <DatePicker
                            name="invoiceStartDate"
                            minDate={moment().toDate()}
                            onChange={(date) => {
                                formValues["invoiceStartDate"] = moment(date).format('L')
                                setStartDate(date)}
                            }

                            value={formValues.invoiceStartDate}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <h6 onClick={() => resetInvoice()}  className="clear-btn btn-primary">Clear</h6>
                </form>
            </div>
        </>
    )
}

export default Invoice