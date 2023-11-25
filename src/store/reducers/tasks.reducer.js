import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  const res = await catchAxiosError(
    async () => await axiosInstance.get("/task")
  )
  return res.data.data
})

export const createTask = createAsyncThunk("tasks/createTask", async (data) => {
  const res = await catchAxiosError(
    async () => await axiosInstance.post("/task", data)
  )
  return res.data.data
})

const tasksAdapter = createEntityAdapter()

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors(({ tasks }) => tasks)

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      tasksAdapter.upsertMany(state, payload)
    })
  }
})

const tasksReducer = tasksSlice.reducer
export default tasksReducer
