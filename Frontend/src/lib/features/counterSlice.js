import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: [],
  },
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.product._id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.value.find((item) => item.product._id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload; 
      const foundItemIndex = state.value.findIndex(
        (item) => item.product._id === productId
      );
      if (foundItemIndex) {
        state.value.splice(foundItemIndex, 1);
      }
    },
  },
})

export const { incrementQuantity, decrementQuantity, removeItem } = counterSlice.actions
export default counterSlice.reducer

