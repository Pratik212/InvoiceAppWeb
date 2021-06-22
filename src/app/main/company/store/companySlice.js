import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";
import FuseUtils from "../../../../utils";


export const addCompany= createAsyncThunk('invoiceApp/addCompany',async (company, { dispatch }) =>{
    try {
        const response = await axios.post('/Company' , company);
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

const companySlice = createSlice({
    name: 'invoiceApp/addCompany',
    initialState: null,
    reducers: {},
    extraReducers: {
        [addCompany.fulfilled]: (state, action) => action.payload
    }
})

export default companySlice.reducer;