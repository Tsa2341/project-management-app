import { Navigate } from "react-router-dom"
import DashBoard from "./DashBoard"
import ProfilePage from "./ProfilePage"
import ProjectsPage from "./ProjectsPage"
import UsersPage from "./UsersPage"

const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "",
        element: <Navigate to="projects" />
      },
      {
        path: "projects",
        element: <ProjectsPage />
      },
      {
        path: "users",
        element: <UsersPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      }
    ]
  }
]

export default dashboardRoutes
