import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"
import catchAxiosError from "../../utils/catchAxiosError"

export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async () => {
    const res = await catchAxiosError(
      async () => await axiosInstance.get("/project")
    )
    return res.data.data
  }
)

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data) => {
    const res = await catchAxiosError(
      async () => await axiosInstance.post("/project", data)
    )
    return res.data.data
  }
)

const projectsAdapter = createEntityAdapter()

export const { selectAll: selectAllProjects, selectById: selectProjectById } =
  projectsAdapter.getSelectors(({ projects }) => projects)

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, { payload }) => {
      projectsAdapter.upsertMany(state, payload)
    })
  }
})

const projectsReducer = projectsSlice.reducer
export default projectsReducer
