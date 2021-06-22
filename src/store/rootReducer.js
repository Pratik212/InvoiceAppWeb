import { combineReducers } from '@reduxjs/toolkit';
import auth from '../app/auth/store';
import Company from '../app/main/company/store/companySlice';

const createReducer = asyncReducers =>
    combineReducers({
        auth,
        Company,
        ...asyncReducers
    });

export default createReducer;