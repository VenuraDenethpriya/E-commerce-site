import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const buySlice = createSlice({
  name: "buy",
  initialState,
  reducers: {
    addToBuy: (state, action) => {
      state.value.push({ product: action.payload, quantity: 1 });
    },
    clearBuy: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBuy, clearBuy } = buySlice.actions;

export default buySlice.reducer;
