import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
}

const authSlice = createSlice({
  name: 'authmodel',
  initialState,
  reducers: {
    signin: (state, action) => {
      const { data } = action.payload
      state.data = data
    }
  }
})
// Action creators are generated for each case reducer function
export const { signin } = authSlice.actions

export default authSlice.reducer
