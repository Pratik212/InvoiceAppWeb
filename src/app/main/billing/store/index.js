import { combineReducers } from '@reduxjs/toolkit';
import addBilling from './billingSlice';

const billingReducers = combineReducers({
    addBilling
});

export default billingReducers;