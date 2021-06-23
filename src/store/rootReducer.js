import { combineReducers } from '@reduxjs/toolkit';
import auth from '../app/auth/store';
import Company from '../app/main/company/store/index';
import Billing from '../app/main/billing/store/index';
import Shipping from '../app/main/shipping/store/index';
import Product from '../app/main/product/store/index';

const createReducer = asyncReducers =>
    combineReducers({
        auth,
        Company,
        Billing,
        Shipping,
        Product,
        ...asyncReducers
    });

export default createReducer;