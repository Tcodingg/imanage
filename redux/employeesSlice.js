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
export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
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

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (formData) => {
    try {
      const { data } = await axios.post('/api/employees/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

      // CREATE EMPLOYEE
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload) {
          console.log('can not add employee');
          console.log(action.payload);
          return;
        }

        let newEmployee = action.payload;
        state.employees = [...state.employees, newEmployee];
      })

      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE EMPLOYEE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
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
        state.employees = employees;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default employeesSlice.reducer;
