import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import loginSlice from './toolkit/login';
import startChat from './toolkit/startChat';
import errorSlice from './toolkit/error';
import sideBar from './toolkit/sideBar';


export const store = configureStore({
    reducer: {
        login: loginSlice,
        startChat: startChat,
        error: errorSlice,
        sideBar: sideBar
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})
