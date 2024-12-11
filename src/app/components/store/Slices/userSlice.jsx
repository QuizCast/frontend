import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incompleteQuestions: [],
    completedQuestions: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIncompleteQuestions: (state, action) => {
            state.incompleteQuestions = action.payload;
        },
        setCompletedQuestions: (state, action) => {
            state.completedQuestions = action.payload;
        },

        removeIncompleteQuestions: (state, action) => {
            state.incompleteQuestions = state.incompleteQuestions.filter(
                (question) => question.id !== action.payload
            );
        },

        removeCompleteQuestions: (state, action) => {
            state.completedQuestions = state.completedQuestions.filter(
                (question) => question.id !== action.payload
            );
        },

        cleanCompletedQuestions: (state) => {
            state.completedQuestions = [];
        },

        cleanIncompleteQuestions: (state) => {
            state.incompleteQuestions = [];
        },
    },
});

export const {
    setUser,
    setIncompleteQuestions,
    setCompletedQuestions,
    removeIncompleteQuestions,
    removeCompleteQuestions,
    cleanCompletedQuestions,
    cleanIncompleteQuestions,
} = userSlice.actions;

export default userSlice.reducer;