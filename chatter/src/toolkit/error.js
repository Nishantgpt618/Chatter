import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    error: false,
    errorMessage: "",
    errorType: ""
}

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showErrorModal: (state, action) => {
            state.error = !state.error;
            state.errorMessage = action.payload.message;
        },
        closeErrorModal: (state) => {
            state.error = !state.error
        }
    }
})

export const {showErrorModal, closeErrorModal} = errorSlice.actions;

export default errorSlice.reducer;
