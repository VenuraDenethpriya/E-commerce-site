import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
        return;
      }
      state.value.push({ product: action.payload, quantity: 1 });
    },
    clearCart: (state) => {
      state.value = [];
    },
    removeItem: (state, action) => {
      state.value = state.value.filter((item) => item.product._id !== action.payload._id);
    },
    decrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.product._id === action.payload._id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.value = state.value.filter((item) => item.product._id !== action.payload._id);
        }
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.product._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart, removeItem, decrementQuantity, incrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;