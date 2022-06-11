import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deliveries: [],
}

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveries: (state, action) => {
      state.deliveries = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDeliveries } = deliverySlice.actions

export default deliverySlice.reducer
