import { configureStore } from "@reduxjs/toolkit";
import userReducer from './estadoUser'

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default store;