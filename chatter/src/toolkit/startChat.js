import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../API";

const initialState = {
    clickedName: null,
    clickedId: null,
    chatData: {
        messages: []
    },
    commonChatId: null
}

export const searchChat = createAsyncThunk(
    '/api/searchChat',
    async ({chatId}) => {
        const res = await axios.post(api.searchChat,{chatId});
        return res
    }
)

export const startChatSlice = createSlice({
    name: "startChat",
    initialState,
    reducers: {
        startChat: (state, action) => {
            state.clickedName = action.payload.userName
            state.clickedId = action.payload.userId
        },
        updateCommonChatId: (state, action) => {
            state.commonChatId = action.payload
        },
        clearChat: (state) => {
            state.chatData = {
                messages: []
            }
        },
        initiateChat: (state, action) => {
            state.chatData = action.payload.chatData;
            state.commonChatId = action.payload.chatData._id;
        },
        flushChatData: (state) => {
            state.clickedName = initialState.clickedName;
            state.clickedId = initialState.clickedId;
            state.chatData = initialState.chatData;
            state.commonChatId = initialState.commonChatId;
        }
        
    },
    extraReducers: {
        // [initiateChat.fulfilled]: (state, action) => {
        //     state.chatData = action.payload.data.chatData
        //     state.commonChatId = action.payload.data.chatData._id
        // },
        [searchChat.fulfilled]: (state, action) => {
            state.chatData.messages = action.payload.data.messages
        }
    }
})

export const {startChat, updateCommonChatId, clearChat, initiateChat, flushChatData} = startChatSlice.actions; 

export default startChatSlice.reducer;

