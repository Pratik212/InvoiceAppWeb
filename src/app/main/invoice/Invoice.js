import React, {useEffect, useState} from "react";
import './Index.css'
import {useDispatch} from "react-redux";
import {addCompany} from "../company/store/companySlice";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {addInvoice} from "./store/invoiceSlice";

function Invoice(props){
    const [initialValues , setInitialValues] = useState(
        { invoiceNo:"" , invoiceStartDate: new Date(), invoiceDueDate: new Date()}
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
            invoiceDueDate : formValues.invoiceDueDate,
        }

        console.log(":::Data::::" , data)
        dispatch(addInvoice(data)).then(res =>{
            debugger
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
                        <DatePicker
                            name="invoiceStartDate"
                            minDate={moment().toDate()}
                            onChange={(date) => {
                                formValues["invoiceStartDate"] = moment(date).format('L')
                                console.log(":::date:::" , formValues )
                                setStartDate(date)}
                            }

                            value={formValues.invoiceStartDate}
                        />
                    </div>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.invoiceDueDate? '30px' :'10px'}}>
                        <DatePicker
                            name="invoiceDueDate"
                            minDate={moment().toDate()}
                            onChange={(date) => {
                                formValues["invoiceDueDate"] = moment(date).format('L')
                                console.log(":::date:::" , formValues )
                                setDueDate(date)}
                            }
                            value={formValues.invoiceDueDate}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <pre>{JSON.stringify(formValues, null, '  ')}</pre>
                </form>
            </div>
        </>
    )
}

export default Invoice