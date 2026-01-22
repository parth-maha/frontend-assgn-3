import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice"

const store = configureStore({
    reducer : {
        reducer : cartReducer
    },
});

export default store;