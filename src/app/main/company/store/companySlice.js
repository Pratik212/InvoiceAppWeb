import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Flip, toast} from "react-toastify";

export const addCompany= createAsyncThunk('invoiceApp/addCompany',async (company, { dispatch }) =>{
    try {
        const response = await axios.post('/Company' , company);

        return response.data;
    } catch (err) {
        toast.error(err.response.data.Message, {
            transition: Flip
        });
    }

})

const companySlice = createSlice({
    name: 'invoiceApp/addCompany',
    initialState: null,
    reducers: {},
    extraReducers: {
        [addCompany.fulfilled]: (state, action) => action.payload
    }
})

export default companySlice.reducer;