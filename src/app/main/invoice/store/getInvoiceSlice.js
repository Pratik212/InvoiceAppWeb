import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from "../../../../utils";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const getInvoice = createAsyncThunk('invoiceApp/invoice/getInvoice', async (data, { dispatch }) => {
    try {
        const response = await axios.get('/Invoice/all');
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

const getInvoiceSlice = createSlice({
    name: 'invoiceApp/Product/getProduct',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getInvoice.fulfilled]: (state, action) => action.payload
    }
});

export default getInvoiceSlice.reducer;