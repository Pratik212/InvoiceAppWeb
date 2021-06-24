import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from "../../../../utils";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const updateProduct = createAsyncThunk('invoiceApp/updateProduct', async (data, { dispatch }) => {
    try {
        debugger
        const response = await axios.put(`/Product/${data.id}`, data);
        // dispatch(
        // 		showMessage({
        //     message: `${response.data.message}`,
        // 			autoHideDuration: 2000,
        // 			anchorOrigin: {
        // 				vertical: 'top',
        // 				horizontal: 'center'
        // 			}
        // 		})
        // 	);
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

const updateCaptionSlice = createSlice({
    name: 'invoiceApp/updateProduct',
    initialState: [],
    reducers: {},
    extraReducers: {
        [updateProduct.fulfilled]: (state, action) => action.payload
    }
});

export default updateCaptionSlice.reducer;