//For configuration
import { configureStore } from "@reduxjs/toolkit"

import userReducer from './user'
import orderReducer from './order'
import deliveryReducer from './delivery'

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
        delivery: deliveryReducer
    }
});


