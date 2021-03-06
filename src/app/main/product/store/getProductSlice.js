import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from "../../../../utils";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const getProduct = createAsyncThunk('invoiceApp/Product/getProduct', async (data, { dispatch }) => {
    try {
        const response = await axios.get('/Product/all');
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

export const getProductById = createAsyncThunk('invoiceApp/getProductById', async (id, { dispatch }) => {
    try {
        const response = await axios.get(`/Product/${id}`);
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

const getProductSlice = createSlice({
    name: 'invoiceApp/Product/getProduct',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => action.payload,
        [getProductById.fulfilled]: (state, action) => action.payload,
    }
});

export default getProductSlice.reducer;