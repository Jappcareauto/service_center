// src/redux/messageSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
    successMessage: string | null;
    errorMessage: string | null;
}

const initialState: MessageState = {
    successMessage: null,
    errorMessage: null
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        },
        clearAllMessages: (state) => {
            state.successMessage = null;
            state.errorMessage = null;
        }
    },
});

export const { setSuccessMessage, setErrorMessage, clearSuccessMessage, clearErrorMessage, clearAllMessages } = messageSlice.actions;

export default messageSlice.reducer;
