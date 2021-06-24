import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from "../../../../utils";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const getProductById = createAsyncThunk('invoiceApp/getProductById', async (id, { dispatch }) => {
    try {
        const response = await axios.get(`/Product/${id}`);
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

const getProductByIdSlice = createSlice({
    name: 'invoiceApp/Product/getProduct',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getProductById.fulfilled]: (state, action) => action.payload
    }
});

export default getProductByIdSlice.reducer;