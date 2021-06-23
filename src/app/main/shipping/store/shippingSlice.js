import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";

export const addShipping= createAsyncThunk('invoiceApp/addShipping',async (shipping, { dispatch }) =>{
    try {
        const response = await axios.post('/Shipping' , shipping);
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

const shippingSlice = createSlice({
    name: 'invoiceApp/addShipping',
    initialState: null,
    reducers: {},
    extraReducers: {
        [addShipping.fulfilled]: (state, action) => action.payload
    }
})

export default shippingSlice.reducer;