import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const authRegister = createAsyncThunk("auth/register", async (data) => {
  const res = await catchAxiosError(
    async () => await axiosInstance.post("/user/signup", data)
  )
  return res
})

export const authLogin = createAsyncThunk("auth/login", async (data) => {
  const res = await catchAxiosError(
    async () => await axiosInstance.post("/user/signin", data)
  )
  return res.data.data.user
})

const initialState = {
  user: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const { setUser } = authSlice.actions

export const selectUser = ({ auth }) => auth.user

const authReducer = authSlice.reducer
export default authReducer
