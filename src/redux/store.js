//For configuration
import { configureStore } from "@reduxjs/toolkit"

import userReducer from './user'
import orderReducer from './order'

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer
    }
});


