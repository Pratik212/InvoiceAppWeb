<<<<<<< HEAD
import React, {useEffect} from 'react';
=======
import React, {useEffect, useState} from 'react';
>>>>>>> origin/develop
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct} from "../product/store/deleteProductSlice";
import {getProduct} from "../product/store/getProductSlice";
import {useHistory} from "react-router-dom";
<<<<<<< HEAD

=======
import Dialog from '@material-ui/core/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
>>>>>>> origin/develop

function ProductList(){
    const history = useHistory();
    const dispatch = useDispatch();
    const products = useSelector(store => store.Product.getProduct.product);
<<<<<<< HEAD
=======
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

>>>>>>> origin/develop

    const updateProduct = (id) => {
        history.push({
            pathname: `product/${id}`
        })
    }

    const deleteProducts = (index) => {
<<<<<<< HEAD
        dispatch(deleteProduct(index.id)).then(res => {
=======
        console.log("index:::" , index.id)
        dispatch(deleteProduct(index.id)).then(res => {
            setOpen(false);
>>>>>>> origin/develop
            dispatch(getProduct());
        });
    }

    useEffect(() => {
        dispatch(getProduct())
    }, []);

    return(
        <>
            <div className="container-fluid">
                <div className="justify-content-center d-flex">
                    <h3>Product List</h3>
                </div>
                <hr style={{marginTop: '20px'}}/>

                <div className="table-responsive-sm">
<<<<<<< HEAD
                    <table className="table table-striped">
                        <thead>
=======
                    <table className="table table-hover table-bordered">
                        <thead className="thead-light">
>>>>>>> origin/develop
                        <tr>
                            <th className="center">#</th>
                            <th>Description</th>
                            <th className="right">Unit Cost</th>
                            <th className="center">Qty</th>
                            <th className="right">Total</th>
                            <th className="right">Action</th>
                        </tr>
                        </thead>
                        {products?.map((item, index) => {
                            return (
                                <>
                                    <tbody>
                                    <tr>
                                        <td className="center">{index + 1}</td>
                                        <td className="left text-capitalize strong">{item.description}</td>
                                        <td className="left">{item.qty}</td>
<<<<<<< HEAD

=======
>>>>>>> origin/develop
                                        <td className="right">{item.unitPrice}</td>
                                        <td className="right">{item.total}</td>
                                        <td className="left">
                                            <div className="row">
                                                <div style={{marginLeft: '20px'}}
                                                     onClick={() => updateProduct(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                         height="16"
                                                         fill="currentColor" className="bi bi-pencil-fill"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>
                                                </div>
<<<<<<< HEAD
                                                <div style={{marginLeft: '20px'}} onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?')) deleteProducts(item)
                                                }}>
=======
                                                <div style={{marginLeft: '20px'}} onClick={handleClickOpen}>
>>>>>>> origin/develop
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                         height="16"
                                                         fill="currentColor" className="bi bi-trash-fill"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
<<<<<<< HEAD
                                </>
=======
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">{"Are you sure want to delete?"}</DialogTitle>

                                        <DialogActions>
                                            <button className="btn-disAgree" onClick={handleClose} color="primary" style={{outline:"none"}}>
                                                Disagree
                                            </button>
                                            <button className="btn-Agree" onClick={() => deleteProducts(item)} color="primary" style={{outline:"none"}}>
                                                Agree
                                            </button>
                                        </DialogActions>
                                    </Dialog>
                                </>

>>>>>>> origin/develop
                            )
                        })}
                    </table>
                    {products?.length === undefined &&
                    <h5 style={{alignItems: 'center', justifyContent: "center", display: 'flex'}}>Product
                        Not Found</h5>
                    }
                </div>
            </div>
<<<<<<< HEAD
=======

>>>>>>> origin/develop
        </>
    )
}

export default ProductList