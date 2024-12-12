import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Participant: {"id": null, "name": "", "room_key": ""},
    Questions: [],
};


const participantSlice = createSlice({
    name: "participant",
    initialState,
    reducers: {
        setParticipant: (state, action) => {
            state.Participant = action.payload;
        },
        removeParticipant: (state) => {
            state.Participant = {"id": null, "name": "", "room_key": ""};
        },
        setQuestions: (state, action) => {
            state.Questions = [action.payload];
        },
        cleanQuestions: (state) => {
            state.Questions = [];
        },
    },
});

export const { setParticipant, removeParticipant, setQuestions, cleanQuestions } = participantSlice.actions;

export default participantSlice.reducer;