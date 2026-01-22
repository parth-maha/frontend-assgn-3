
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../types/types';

interface CartState {
  cart: Item[];
}

const loadFromStorage = (): Item[] => {
  try {
    const products = localStorage.getItem("cart");
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.warn("Failed to load cart from local storage", error);
    return [];
  }
};
const initialState : CartState = {
  cart: loadFromStorage(),
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action : PayloadAction<Item>) => {
      const existing = state.cart.find(i => i.id === action.payload.id);

      if (existing) {
        existing.stock += 1;
      } else {
        state.cart.push({ ...action.payload, stock: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decrementItem: (state, actions : PayloadAction<Item>) => {
      const idToReduce = actions.payload.id;
      const itemToReduce = state.cart.find(item => item.id === idToReduce);

      if (itemToReduce && itemToReduce.stock > 0) {
        itemToReduce.stock--;
        if (itemToReduce.stock === 0) {
          state.cart = state.cart.filter(item => item.id !== idToReduce);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, actions : PayloadAction<Item>) => {
      const item = state.cart.find(i => i.id === actions.payload.id);
      if (!item) return;

      state.cart = state.cart.filter(i => i.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart : (state) =>{
      state.cart = []
      localStorage.removeItem("cart")
    }
  },
});

export const { addToCart, decrementItem, removeFromCart ,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
