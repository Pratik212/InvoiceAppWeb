import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const addCompany= createAsyncThunk('invoiceApp/addCompany',async company =>{
    const response = await axios.post('/Company' , company);
    debugger
    const data =await response.data;
    return data;
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