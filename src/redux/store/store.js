// state container holding application's state
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
import expenseReducer from "../slices/expense/expenseSlices";
import incomeReducer from "../slices/income/incomeSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    expense: expenseReducer,
    income: incomeReducer,
  },
});

export default store;
