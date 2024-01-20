import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    message: "hello"
}

export const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.loggedIn = action.payload.status;
            state.message =  action.payload.message;
        }
    }
})

export const {changeStatus} = sideBarSlice.actions;

export default sideBarSlice.reducer;