import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addShipping} from "./store/shippingSlice";
import {Flip, toast} from "react-toastify";
import Toaster from "../toaster/Toaster";

function Shipping(){
    const history = useHistory();
    const [initialValues , setInitialValues] = useState(
        { departmentName:"" , clientCompany: "",  address:"" , phoneNumber : ""}
    );
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const submitForm = () => {
        const data = {
            departmentName : formValues.departmentName,
            clientCompany : formValues.clientCompany,
            phoneNumber : formValues.phoneNumber,
            address:formValues.address
        }

        window.localStorage.setItem("shipping",JSON.stringify(data));

        dispatch(addShipping(data)).then(res =>{
            if (res.payload){
                toast.success("Shipping Address successfully add.", {
                    transition: Flip
                });
                setTimeout(() => {
                    history.push({
                        pathname: '/finalInvoice'
                    })
                },5000)
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
        if (!values.departmentName) {
            errors.departmentName = "Department name is required!";
        }
        if (!values.clientCompany) {
            errors.clientCompany = "ClientCompany name is required!";
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

    const resetShipping = () =>{
        window.localStorage.removeItem("shipping");
        setFormValues({
            departmentName:"",
            clientCompany: "",
            address:"",
            phoneNumber: ""
        });
    }

    return(
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>Shipping Details</h3>
                </div>
                <hr style={{marginTop:'20px'}}/>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.departmentName? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Department Name</label>
                        <input type="text" className="form-control"  name="departmentName" value={formValues.departmentName}
                               onChange={handleChange}/>
                        {formErrors.departmentName && (
                            <span style={{color:"red"}} className="error">{formErrors.departmentName}</span>
                        )}
                    </div>

                    <div className="form-group" style={{marginTop:'20px' ,marginBottom: formErrors.clientCompany? '30px' :'10px'}}>
                        <label htmlFor="exampleInputEmail1">Client Name</label>
                        <input type="text" className="form-control"  name="clientCompany" value={formValues.clientCompany}
                               onChange={handleChange}/>
                        {formErrors.clientCompany && (
                            <span style={{color:"red"}} className="error">{formErrors.clientCompany}</span>
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
                    <h6 onClick={() => resetShipping()}  className="clear-btn btn-primary">Clear</h6>
                </form>
                <Toaster/>
            </div>
        </>
    )
}

export default Shipping