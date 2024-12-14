import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    Questions: [],
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        cleanUser: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        setQuestions: (state, action) => {
            state.Questions = action.payload;
        },
        removeQuestions: (state, action) => {
            state.Questions = state.Questions.filter(
                (question) => question.id !== action.payload
            );
        },
        cleanQuestions: (state) => {
            state.Questions = [];
        },
    },
});

export const { setUser, cleanUser, setQuestions, removeQuestions, cleanQuestions, updateUser } = userSlice.actions;

export default userSlice.reducer;