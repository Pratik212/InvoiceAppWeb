import { combineReducers } from '@reduxjs/toolkit';
import addCompany from './companySlice';

const companyReducers = combineReducers({
    addCompany
});

export default companyReducers;