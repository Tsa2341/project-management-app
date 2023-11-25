import { Navigate, Outlet } from "react-router-dom"
import DashBoard from "./DashBoard"
import ProfilePage from "./profile/ProfilePage"
import ProjectsPage from "./projects/ProjectsPage"
import UsersPage from "./users/UsersPage"
import ProjectDetailsPage from "./projects/ProjectDetailsPage"
import TasksPage from "./tasks/TasksPage"
import TaskDetailsPage from "./tasks/TaskDetailsPage"
import UserDetailsPage from "./users/UserDetailsPage"
import UserCreateModal from "./users/partials/UserCreateModal"

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
        element: <ProjectsPage />,
        children: [
          {
            path: ":id",
            element: <ProjectDetailsPage />
          },
          {
            path: "create",
            element: <Outlet />
          },
          {
            path: "edit",
            element: <Outlet />
          },
          {
            path: "delete",
            element: <Outlet />
          }
        ]
      },
      {
        path: "tasks",
        element: <TasksPage />,
        children: [
          {
            path: ":id",
            element: <TaskDetailsPage />
          },
          {
            path: "create",
            element: <Outlet />
          }
        ]
      },
      {
        path: "users",
        element: <UsersPage />,
        children: [
          {
            path: ":id",
            element: <UserDetailsPage />
          },
          {
            path: "create",
            element: <UserCreateModal />
          }
        ]
      },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            path: "edit",
            element: <Outlet />
          }
        ]
      }
    ]
  }
]

export default dashboardRoutes
