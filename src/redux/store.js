//For configuration
import { configureStore } from "@reduxjs/toolkit"

import counterReducer from "./counter"
import userReducer from './user'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
});


