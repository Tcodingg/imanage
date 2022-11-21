import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employeesSlice';

const store = configureStore({
  reducer: {
    employeesSlice,
  },
});

export default store;
