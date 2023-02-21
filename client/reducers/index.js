import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import {
    createStateSyncMiddleware,
    initMessageListener,
  } from "redux-state-sync";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [createStateSyncMiddleware()],
})