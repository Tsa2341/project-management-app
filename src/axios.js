import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" })

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return new Promise((resolve, reject) => {
      if (err.response.status === 401) {
        // if you ever get an unauthorized response, logout the user
        localStorage.removeItem("token")
      }
      throw err
    })
  }
)

export default axios
