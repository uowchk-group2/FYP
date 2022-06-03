import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  signedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      console.log("action.payload: " + action.payload)
      state.username = action.payload
    },
    setSignedIn: (state, action) => {
      state.signedIn = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUsername,setSignedIn } = userSlice.actions

export default userSlice.reducer
