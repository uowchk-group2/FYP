import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOrders } = orderSlice.actions

export default orderSlice.reducer
