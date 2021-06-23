import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";

export const addBilling= createAsyncThunk('invoiceApp/addBilling',async (billing, { dispatch }) =>{
    try {
        const response = await axios.post('/Billing' , billing);
        dispatch(
            showMessage({
                message: `${response.data.message}`,
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })
        );
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: err.response.data.Message }));
    }

})

const billingSlice = createSlice({
    name: 'invoiceApp/addBilling',
    initialState: null,
    reducers: {},
    extraReducers: {
        [addBilling.fulfilled]: (state, action) => action.payload
    }
})

export default billingSlice.reducer;