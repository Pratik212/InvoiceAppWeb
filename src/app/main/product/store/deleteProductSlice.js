import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from "../../../../utils";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const deleteProduct = createAsyncThunk('invoiceApp/Product/deleteProduct', async (data, { dispatch }) => {
    try {
        const response = await axios.post('/Product/delete', [data]);
        return response.data.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

const deleteProductSlice = createSlice({
    name: 'invoiceApp/product/deleteProduct',
    initialState: [],
    reducers: {},
    extraReducers: {
        [deleteProduct.fulfilled]: (state, action) => action.payload
    }
});

export default deleteProductSlice.reducer;