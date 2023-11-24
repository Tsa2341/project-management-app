import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from "./reducers/user.reducer"
import authReducer from "./reducers/auth.reducer"

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer
})

export default rootReducer
