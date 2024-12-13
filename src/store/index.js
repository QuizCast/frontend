import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Slices/userSlice";
import roomReducer from "./Slices/roomSlice";
import participantReducer from "./Slices/participantSlice";
import leaderBoardReducer from "./Slices/leaderBoardSlice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    room_key: roomReducer,
    participant: participantReducer,
    leaderBoard: leaderBoardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
