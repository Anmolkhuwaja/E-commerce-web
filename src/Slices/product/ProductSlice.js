import { createSlice } from "@reduxjs/toolkit";


const ProductSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
    },

    reducers: {
        addProduct: (state, action) => {
            
            const {product, toast} = action.payload;
            const isExist = state.items.find((item) => item.id === product.id);

            if(isExist){
                toast.error("Item already added!")
            }
            else{
                toast.success("Item successfully added!")
            state.items.push({...product, quantity: 1});
            }
        },

        increaseQuantity: (state, action)=>{
            const product = state.items.find((item) => item?.id === action.payload.id);
            if(product){
                product.quantity += 1;
            }
        },

        
        decreaseQuantity: (state, action)=>{
            const product = state.items.find((item) => item?.id === action.payload.id);
            if(product && product.quantity>1){
                product.quantity -= 1;
            } else{
                state.items = state.items.filter((item)=> item.id !== action.payload.id)
            }
        },

        removeProduct: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter((item) => item?.id !== id);
        },
    },
});

export const {addProduct, increaseQuantity, decreaseQuantity, removeProduct} = ProductSlice.actions;
export default ProductSlice.reducer;