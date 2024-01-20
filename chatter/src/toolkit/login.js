import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../API";
import axios from "axios";
import { showErrorModal } from "./error";
import { changeStatus } from "./sideBar";

const initialState = {
  loading: false,
  loggedInUser: {
    AllchatID: [],
  },
};

export const loginUser = createAsyncThunk("api/login", async (data, thunkAPI) => {
  try{
    const res = await axios.post( api.loginApi, {
    email: data.email,
    password: data.password,
  })
  data.setShowLogin(false);
  return { res , data };
  }catch(error){
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    thunkAPI.dispatch(showErrorModal({message}))
    return thunkAPI.rejectWithValue({error, dispatch: data.dispatch, showErrorModal: data.showErrorModal})
  }
});


export const signUpUser = createAsyncThunk( "/api/signUp", async (data, thunkAPI) => {
  try {
    const res = await axios.post(api.signUp, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contactNumber: data.contactNumber,
      password: data.password
    });
    const resetStatus = () => {
      thunkAPI.dispatch(changeStatus({status: false, message: ""}))
    }
    data.setShowSignUp(false);
    data.setActive(true);
    thunkAPI.dispatch(changeStatus({status: true, message: "Signup successful now you can proceed to login"}));
    setTimeout(resetStatus, 6000)
    return { res };
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    thunkAPI.dispatch(showErrorModal({message}))
  }
})

export const updateUser = createAsyncThunk("/api/updateUser", async (data, {rejectWithValue}) => {
  try {
    const res = axios.post(api.updateUser, { data });
    return res;
  } catch(error) {
        console.log(error);
        return rejectWithValue(error.response)
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("userData");
      state.loggedInUser = initialState.loggedInUser;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      action.payload.data.socket.emit("loginUser",action.payload.res.data);
      state.loggedInUser = action.payload.res.data;
      localStorage.setItem("userData", JSON.stringify(action.payload.res.data));
    },
    [signUpUser.pending]: (state) => {
      state.loading = true;
    },
    [signUpUser.rejected]: (state) => {
      state.loading = false;
    },
    [signUpUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.data.user;
    },
  },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
