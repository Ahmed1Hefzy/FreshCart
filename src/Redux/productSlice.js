import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export let getBrands = createAsyncThunk(
    "product/getBrands",
    async function(){
        let {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        return data;
    }
);
let initialState={
    counter:20,
    brands:[]
    
};

let productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        increament:(state)=>{
            state.counter++;
        },
        decreament:(state)=>{
            state.counter--;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getBrands.fulfilled, (state,action)=>{
            state.brands=action.payload;
        })
    },
});

export let{increament,decreament}=productSlice.actions;
export let productReducer = productSlice.reducer;
