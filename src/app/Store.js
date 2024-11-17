import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../Slices/addCart/addCartSlice";

export const store = configureStore ({
    reducer: {
        counter: counterReducer,
    },
});