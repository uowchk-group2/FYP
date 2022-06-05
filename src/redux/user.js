import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  signedIn: false,
  userId: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action.payload)
      state.username = action.payload.username
      state.signedIn = action.payload.signedIn
      state.userId = action.payload.id
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
