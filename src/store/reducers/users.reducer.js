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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ data, id }) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key])
      }
    })

    const res = await catchAxiosError(
      async () => await axiosInstance.patch(`/user/${id}`, formData)
    )
    return res.data.data
  }
)

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id }) => {
    const res = await catchAxiosError(
      async () => await axiosInstance.delete(`/user/${id}`)
    )
    return res.data.data
  }
)

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.createdAt < b.createdAt ? 1 : -1)
})

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(({ users }) => users)

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    selectedUser: null
  }),
  reducers: {
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      usersAdapter.upsertMany(state, payload)
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const oldUser = localStorage.getItem("user")
      const parsedOldUser = oldUser ? JSON.parse(oldUser) : {}
      localStorage.setItem(
        "user",
        JSON.stringify({ ...parsedOldUser, ...payload })
      )
      usersAdapter.upsertOne(state, payload)
    })
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      usersAdapter.upsertOne(state, payload)
    })
  }
})

export const selectSelectedUser = ({ users }) => users.selectedUser

export const { setSelectedUser } = usersSlice.actions

export const selectUserByUserName = (state, username) =>
  selectAllUsers(state).find((user) => user.username === username)

const usersReducer = usersSlice.reducer
export default usersReducer
