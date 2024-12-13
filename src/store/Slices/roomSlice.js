import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    room_key: null,
};


const roomSlice = createSlice({
    name: "room_key",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.room_key = action.payload;
        },
        removeRoom: (state) => {
            state.room_key = null;
        },
    },
});

export const { setRoom, removeRoom } = roomSlice.actions;

export default roomSlice.reducer;