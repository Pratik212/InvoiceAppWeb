import { combineReducers } from '@reduxjs/toolkit';
import addInvoice from './invoiceSlice';

const companyReducers = combineReducers({
    addInvoice
});

export default companyReducers;