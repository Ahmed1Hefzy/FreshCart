import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './productSlice'

configureStore
export let store = configureStore({
    reducer: {
        //reducer name
        productRedux:productReducer
    },
})

