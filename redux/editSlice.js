import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  employeeData: {
    id: '',
    image: '',
    name: '',
    role: '',
    salary: null,
    typeEmployee: '',
  },
};
const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    editEmployee(state, action) {
      // console.log(action.payload);
      state.employeeData = action.payload;
    },
  },
});

export const { editEmployee } = editSlice.actions;
export default editSlice.reducer;
