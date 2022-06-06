import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  signedIn: false,
  userId: 0,
  company:"",
  role:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAll:(state,action) => {
      state.username = ""
      state.signedIn = false
      state.userId = 0
      state.company = ""
      state.role = ""
    },
    setUserInfo: (state, action) => {
      state.username = action.payload.username
      state.signedIn = action.payload.signedIn
      state.userId = action.payload.id
      state.company = action.payload.company
      
      let role = action.payload.role.substring(5)
      state.role = role.at(0) + role.substring(1).toLowerCase()
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,clearAll } = userSlice.actions

export default userSlice.reducer
