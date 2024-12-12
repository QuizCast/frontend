import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incompleteQuestions: [
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: 0, // Index of the correct option
        },
        {
            id: 2,
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: 1,
        },
        {
            id: 3,
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 2,
        },
    ],
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