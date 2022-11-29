import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employeesSlice';
import editSlice from './editSlice';

const store = configureStore({
  reducer: {
    employeesSlice,
    editSlice,
  },
});

export default store;
