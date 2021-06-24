import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addBilling} from "./store/billingSlice";
import {useHistory} from "react-router-dom";

function Billing (){
    const history = useHistory();
    const [initialValues , setInitialValues] = useState(
        { contactName:"" , companyName: "", email: "" , address:"" , phoneNumber : ""}
    );
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const submitForm = () => {
        const data = {
            contactName : formValues.contactName,
            companyName : formValues.companyName,
            email : formValues.email,
            phoneNumber : formValues.phoneNumber,
            address:formValues.address
        }

        dispatch(addBilling(data)).then(res =>{
            if (res.payload){
                window.localStorage.setItem("billing",JSON.stringify(data));
                setInitialValues(null)
                history.push({
                    pathname:'/shipping'
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.contactName) {
            errors.contactName = "Contact name is required!";
        }
        if (!values.companyName) {
            errors.companyName = "Company name is required!";
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

    const resetBilling = () =>{
        window.localStorage.removeItem("billing");
        setFormValues({
            contactName:"",
            companyName: "",
            email: "",
            address:"",
            phoneNumber: ""
        });
    }

    return(
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>Billing Details</h3>
                </div>
                <hr style={{marginTop:'20px'}}/>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.contactName? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Contact Name</label>
                        <input type="text" className="form-control"  name="contactName" value={formValues.contactName}
                               onChange={handleChange}/>
                        {formErrors.contactName && (
                            <span style={{color:"red"}} className="error">{formErrors.contactName}</span>
                        )}
                    </div>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.companyName? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Company Name</label>
                        <input type="text" className="form-control"  name="companyName" value={formValues.companyName}
                               onChange={handleChange}/>
                        {formErrors.companyName && (
                            <span style={{color:"red"}} className="error">{formErrors.companyName}</span>
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

                    <h6 onClick={() => resetBilling()}  className="clear-btn btn-primary">Clear</h6>
                </form>

            </div>
        </>
    )
}

export default Billing