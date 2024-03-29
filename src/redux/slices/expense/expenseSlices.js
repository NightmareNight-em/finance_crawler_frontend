import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import deployURL from "../../../constants/constants";

var forDeleteState = "";
//make create expense action
export const createExp = createAsyncThunk(
  "expense/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `${deployURL}/api/expense`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//make update expense action
export const updateExp = createAsyncThunk(
  "expense/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.put(
        `${deployURL}/api/expense/` +
          payload?.id +
          "/update",
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch all expenses action
export const fetchAllExp = createAsyncThunk(
  "expense/fetchAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.get(
        `${deployURL}/api/expense/all?page=` +
          payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch single expenses action
export const fetchExpensePerPage = createAsyncThunk(
  "expense/fetchSingle",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.get(
        `${deployURL}/api/expense/` +
          payload?.id +
          "?page=" +
          payload?.page,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch single expenses action WOP (WithOut Pagination)
export const fetchAllExpenses = createAsyncThunk(
  "expense/fetchAllExpenses",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    const token = state?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.get(
        `${deployURL}/api/expense/wop/` +
          payload?.id,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//make delete expense action
export const deleteExp = createAsyncThunk(
  "expense/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // GET TOKEN FROM STATE
    const state = getState();
    forDeleteState = state;
    const token = state?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer:" + token,
      },
    };
    try {
      //make http call here
      const { data } = await axios.delete(
        `${deployURL}/api/expense/` +
          payload?.id +
          "/delete",
        config
      ).then((data)=>{
          return data;
      });
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const expenseSlices = createSlice({
  name: "expense",
  initialState: {
    // userAuth: userDataFromStorage,
  },
  extraReducers: (builder) => {
    //for create expense action

    // handle pending state
    builder.addCase(createExp.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(createExp.fulfilled, (state, action) => {
      state.expense = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(createExp.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Fetch all action

    // handle pending state
    builder.addCase(fetchExpensePerPage.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(fetchExpensePerPage.fulfilled, (state, action) => {
      state.expenseList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(fetchExpensePerPage.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Fetch single action wop

    // handle pending state
    builder.addCase(fetchAllExpenses.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(fetchAllExpenses.fulfilled, (state, action) => {
      state.expenseListwop = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(fetchAllExpenses.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Update expenses
    // handle pending state
    builder.addCase(updateExp.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(updateExp.fulfilled, (state, action) => {
      state.expenseUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(updateExp.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for delete expenses
    // handle pending state
    builder.addCase(deleteExp.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(deleteExp.fulfilled, (state, action) => {
        // const expenseList = forDeleteState?.expense?.expenseList?.exp.filter(expList => expList._id !== action?.payload?._id);
        // state.expenseList = {exp : expenseList, totalPages: forDeleteState?.expense?.expenseList?.totalPages};
        state.deleted = true;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;

    });

    //handle rejected state
    builder.addCase(deleteExp.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default expenseSlices.reducer;
