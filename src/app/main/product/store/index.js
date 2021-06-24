import { combineReducers } from '@reduxjs/toolkit';
import addProduct from './productSlice';
import getProduct from './getProductSlice';
import updateProduct from './updateProductSlice';
import getProductById from './getProductByIdSlice';

const productReducers = combineReducers({
    addProduct,
    getProduct,
    updateProduct,
    getProductById
});

export default productReducers;