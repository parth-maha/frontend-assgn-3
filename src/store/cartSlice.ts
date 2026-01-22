import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [{id : 1,stock:0, image : null, price:0,rating:0,title:""}],
  totalValue: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      const newItem = actions.payload;
      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.stock++;
      } else {
        state.cart.push({ ...newItem, stock: 1 }); 
      }
      state.totalValue += newItem.price;
    },

    decrementItem: (state, actions) => {
      const idToReduce = actions.payload.id;
      const itemToReduce = state.cart.find(item => item.id === idToReduce);

      if (itemToReduce && itemToReduce.stock > 0) {
        itemToReduce.stock--;
        state.totalValue -= itemToReduce.price;

        if (itemToReduce.stock === 0) {
          state.cart = state.cart.filter(item => item.id !== idToReduce);
        }
      }
    },

    removeFromCart: (state, actions) => {
      const idToRemove = actions.payload.id;
      const itemToRemove = state.cart.find(item => item.id === idToRemove);

      if (itemToRemove) {
        state.cart = state.cart.filter(item => item.id !== idToRemove);
        state.totalValue -= (itemToRemove.stock * itemToRemove.price);
      }
    },
    clearCart : (state, actions) =>{
      state.cart = []
    }
  },
});

export const { addToCart, decrementItem, removeFromCart ,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
