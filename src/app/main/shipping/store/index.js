import { combineReducers } from '@reduxjs/toolkit';
import addShipping from './shippingSlice';

const shippingReducers = combineReducers({
    addShipping
});

export default shippingReducers;