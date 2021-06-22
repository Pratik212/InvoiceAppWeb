import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import './Company.css';
import {addCompany} from "./store/companySlice";
import {useDispatch} from "react-redux";

function Company(){

    const history = useHistory();
    const [initialValues , setInitialValues] = useState(
        { name:"" , email: "", phoneNumber: "" , address:"" }
    );
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const submitForm = () => {
        const data = {
            name : formValues.name,
            email : formValues.email,
            phoneNumber : formValues.phoneNumber,
            address:formValues.address
        }

        dispatch(addCompany(data)).then(res =>{
            if (res.payload){
                setInitialValues("")
                history.push('/invoice')
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Company name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.address) {
            errors.address = "Address is required!";
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = "Phone number is required!";
        } else if (values.phoneNumber.length < 10) {
            errors.phoneNumber = "Phone Number must be more than 10 Digit";
        }else if(values.phoneNumber.length >10){
            errors.phoneNumber = "Phone Number must be  10 Digit";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    return (
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>Company Details</h3>
                </div>
                <hr style={{marginTop:'20px'}}/>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.name? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Company Name</label>
                        <input type="text" className="form-control"  name="name" value={formValues.name}
                               onChange={handleChange}/>
                        {formErrors.name && (
                            <span style={{color:"red"}} className="error">{formErrors.name}</span>
                        )}
                    </div>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom:formErrors.email? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" name="email" value={formValues.email}
                               onChange={handleChange}/>
                        {formErrors.email && (
                            <span style={{color:"red"}} className="error">{formErrors.email}</span>
                        )}

                    </div>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom:formErrors.address? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Address</label>
                        <input type="textarea" className="form-control" name="address" value={formValues.address}
                               onChange={handleChange}/>
                        {formErrors.address && (
                            <span style={{color:"red"}} className="error">{formErrors.address}</span>
                        )}

                    </div>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom:formErrors.phoneNumber? '30px' :'10px'}}>
                        <label htmlFor="exampleInputPassword1">Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber"  value={formValues.phoneNumber}
                               onChange={handleChange} />
                        {formErrors.phoneNumber && (
                            <span style={{color:"red"}} className="error">{formErrors.phoneNumber}</span>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Company