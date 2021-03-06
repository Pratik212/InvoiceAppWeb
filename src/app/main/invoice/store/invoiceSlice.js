import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";

export const addInvoice= createAsyncThunk('invoiceApp/addInvoice',async (invoice, { dispatch }) =>{
    try {
        const response = await axios.post('/Invoice' , invoice);
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

const invoiceSlice = createSlice({
    name: 'invoiceApp/addInvoice',
    initialState: null,
    reducers: {},
    extraReducers: {
        [addInvoice.fulfilled]: (state, action) => action.payload
    }
})

export default invoiceSlice.reducer;