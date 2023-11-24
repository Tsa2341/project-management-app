import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const userEntityAdapter = createEntityAdapter()

const usersSlice = createSlice({
  name: "users",
  initialState: userEntityAdapter.getInitialState(),
  reducers: {}
})

const usersReducer = usersSlice.reducer
export default usersReducer
