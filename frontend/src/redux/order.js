import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  currentOrder: {}
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOrders, setCurrentOrder } = orderSlice.actions

export default orderSlice.reducer
