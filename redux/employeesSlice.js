import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  employees: [],
  isLoading: false,
  error: null,
};

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  async () => {
    try {
      const { data } = await axios.get('/api/employees');
      return data;
    } catch (error) {
      return error;
    }
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
  extraReducers: {
    [getEmployees.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    },
    [getEmployees.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default employeesSlice.reducer;
