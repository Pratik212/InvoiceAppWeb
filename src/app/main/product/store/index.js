import { combineReducers } from '@reduxjs/toolkit';
import addProduct from './productSlice';
import getProduct from './getProductSlice';

const productReducers = combineReducers({
    addProduct,
    getProduct
});

export default productReducers;