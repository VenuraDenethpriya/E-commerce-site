import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.value.find(item => item.product._id === action.payload)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.value.find(item => item.product._id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },
    removeItem: (state, action) => {
      state.value = state.value.filter(item => item.product._id !== action.payload)
    },
  },
})

export const { incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer