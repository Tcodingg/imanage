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
export const deleteEmployees = createAsyncThunk(
  'employees/deleteEmployees',
  async (id) => {
    try {
      const response = await axios.delete(`/api/employees/${id}`);
      if (response.status === 200) return id;
      return `${response.status}: ${response.statusText}`;
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

  extraReducers: (builder) => {
    // GET ALL EMPLOYEES
    builder
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE EMPLOYEE
      .addCase(deleteEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action?.payload) {
          console.log('delete can not be completed');
          console.log(action.payload);
          return;
        }
        let id = action.payload;
        console.log(id);
        const employees = state.employees.filter(
          (employee) => employee._id !== id
        );
        console.log(employees, 'left');
        state.employees = employees;
      })
      .addCase(deleteEmployees.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default employeesSlice.reducer;
