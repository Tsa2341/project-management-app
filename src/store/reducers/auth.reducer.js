import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    name: "me",
    email: "me@gmail.com",
    user: "",
    role: "manager",
    image:
      "https://res.cloudinary.com/tsa2341/image/upload/v1644601396/bqmtef4gqyqqhpdfhk3u.jpg"
  }
}

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
})

export const selectUser = ({ auth }) => auth.user

const authReducer = userSlice.reducer
export default authReducer
