import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import deployURL from "../../../constants/constants";
var forDeleteState = "";
//make create income action
export const createInc = createAsyncThunk(
  "income/create",
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
        `${deployURL}/api/income`,
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

//make update income action
export const updateInc = createAsyncThunk(
  "income/update",
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
        `${deployURL}/api/income/` +
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

// fetch single income action
export const fetchIncomePerPage = createAsyncThunk(
  "income/fetchIncomePerPage",
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
        `${deployURL}/api/income/` +
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

// fetch single income action WOP (WithOut Pagination)
export const fetchAllIncomes = createAsyncThunk(
  "income/fetchAllIncomes",
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
        `${deployURL}/api/income/wop/` +
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

//make delete income action
export const deleteInc = createAsyncThunk(
  "income/delete",
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
        `${deployURL}/api/income/` + payload?.id + "/delete",
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

const incomeSlices = createSlice({
  name: "income",
  initialState: {
    // userAuth: userDataFromStorage,
  },
  extraReducers: (builder) => {
    //for create income action

    // handle pending state
    builder.addCase(createInc.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(createInc.fulfilled, (state, action) => {
      state.income = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(createInc.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Fetch single action

    // handle pending state
    builder.addCase(fetchIncomePerPage.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(fetchIncomePerPage.fulfilled, (state, action) => {
      state.incomeList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(fetchIncomePerPage.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Fetch single action WOP

    // handle pending state
    builder.addCase(fetchAllIncomes.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(fetchAllIncomes.fulfilled, (state, action) => {
      state.incomeListwop = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(fetchAllIncomes.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for Update Income
    // handle pending state
    builder.addCase(updateInc.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(updateInc.fulfilled, (state, action) => {
      state.incomeUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(updateInc.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //for delete incomes
    // handle pending state
    builder.addCase(deleteInc.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle success state
    builder.addCase(deleteInc.fulfilled, (state, action) => {
      state.deleted = true;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //handle rejected state
    builder.addCase(deleteInc.rejected, (state, action) => {
      // console.log(action);
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default incomeSlices.reducer;
