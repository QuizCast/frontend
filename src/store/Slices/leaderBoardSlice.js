import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaderBoard: [],
};

const leaderBoardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {
        updateLeaderboard: (state, action) => {
            action.payload.forEach((updatedEntry) => {
                const existingEntry = state.leaderBoard.find(
                    (entry) => entry.id === updatedEntry.id
                );
                if (existingEntry) {
                    existingEntry.score = updatedEntry.score;
                } else {
                    // Only add the entry if it doesn't already exist
                    state.leaderBoard.push(updatedEntry);
                }
            });
        },
        insertLeaderboard: (state, action) => {
            // Avoid appending duplicates when adding manually
            const existingEntry = state.leaderBoard.find(
                (entry) => entry.id === action.payload.id
            );
            if (!existingEntry) {
                state.leaderBoard = [...state.leaderBoard, action.payload];
            }
        },
        removeOneRecord: (state, action) => {
            state.leaderBoard = state.leaderBoard.filter(
                (entry) => entry.id !== action.payload.id
            );
        },
        cleanLeaderboard: (state) => {
            state.leaderBoard = initialState.leaderBoard;
        },
    },
});

export const { updateLeaderboard, insertLeaderboard, cleanLeaderboard, removeOneRecord } =
    leaderBoardSlice.actions;
export default leaderBoardSlice.reducer;
