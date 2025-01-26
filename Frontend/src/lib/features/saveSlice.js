import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    addToSave: (state, action) => {
      const product = action.payload;

      const foundItemIndex = state.value.findIndex(
        (item) => item._id === product._id
      );

      if (foundItemIndex !== -1) {
        state.value.splice(foundItemIndex, 1);
      } else {
        state.value.push(product);
      }
    },
  },
});


export const { addToSave } = saveSlice.actions;

export default saveSlice.reducer;
