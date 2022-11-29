import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    editEmployee(state, action) {
      state = action.payload;
    },
  },
});

export const { editEmployee } = editSlice.actions;
export default editSlice.reducer;
