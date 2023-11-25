import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const res = await catchAxiosError(
    async () => await axiosInstance.get("/user")
  )
  return res.data.data
})

export const createUser = createAsyncThunk("users/createUser", async (data) => {
  const res = await catchAxiosError(
    async () => await axiosInstance.post("/user", data)
  )
  return res.data.data
})

const usersAdapter = createEntityAdapter()

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(({ users }) => users)

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      usersAdapter.upsertMany(state, payload)
    })
  }
})

const usersReducer = usersSlice.reducer
export default usersReducer
