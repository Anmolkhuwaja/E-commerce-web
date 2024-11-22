import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../Slices/addCart/addCartSlice";
import productReducer from "../Slices/product/ProductSlice"

export const store = configureStore ({
    reducer: {
        counter: counterReducer,
        products: productReducer,
    },
});