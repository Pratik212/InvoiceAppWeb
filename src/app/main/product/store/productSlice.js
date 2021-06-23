import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";

export const addProduct= createAsyncThunk('invoiceApp/addProduct',async (product, { dispatch }) =>{
    try {
        const response = await axios.post('/Product' , product);
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

const productSlice = createSlice({
    name: 'invoiceApp/addProduct',
    initialState: null,
    reducers: {},
    extraReducers: {
        [addProduct.fulfilled]: (state, action) => action.payload
    }
})

export default productSlice.reducer;