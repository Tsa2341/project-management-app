import AddRoundedIcon from "@mui/icons-material/AddRounded"
import { Box, Button, Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header"
import StatusDot from "../../components/StatusDot"
import CustomTable from "../../components/table/CustomTable"
import {
  getAllProjects,
  selectAllProjects
} from "../../store/reducers/projects.reducer"
import formatDate from "../../utils/formatDate"
import ProjectCreateModal from "./partials/ProjectCreateModal"

export const projectRows = [
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true
  },
  {
    id: "description",
    align: "left",
    disablePadding: false,
    label: "Description",
    sort: true
  },
  {
    id: "status",
    align: "center",
    disablePadding: false,
    label: "Status",
    sort: true,
    format: (value) => (
      <div className="flex flex-row items-center justify-center">
        <StatusDot status={value} />
        {value ? "Active" : "Inactive"}
      </div>
    )
  },
  {
    id: "start_date",
    align: "center",
    disablePadding: false,
    label: "Start Date",
    sort: true,
    format: formatDate
  },
  {
    id: "end_date",
    align: "center",
    disablePadding: false,
    label: "End Date",
    sort: true,
    format: formatDate
  },
  {
    id: "createdAt",
    align: "right",
    disablePadding: false,
    label: "Created At",
    sort: true,
    format: formatDate
  }
]

const ProjectsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const projects = useSelector(selectAllProjects)
  const [projectCreateModalOpen, setProjectCreateModalOpen] = useState(false)

  const handleClick = (n) => {
    navigate(`/dashboard/projects/${n.id}`)
  }

  useEffect(() => {
    if (location.pathname === "/dashboard/projects/create") {
      setProjectCreateModalOpen(true)
    } else {
      setProjectCreateModalOpen(false)
    }
  }, [location.pathname])

  if (id) {
    return <Outlet />
  }

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
        <Header
          title="Projects"
          actions={[
            <Button
              variant="contained"
              color="secondary"
              key={1}
              onClick={() => {
                navigate("/dashboard/projects/create")
              }}
            >
              <AddRoundedIcon className="w-40" />
              <Typography>Create Project</Typography>
            </Button>
          ]}
        />
        <Paper className="overflow-auto mt-14 min-h-36" elevation={0}>
          <CustomTable
            rows={projectRows}
            handleClick={handleClick}
            data={projects}
          />
        </Paper>
      </Box>
      {projectCreateModalOpen && <ProjectCreateModal />}
    </>
  )
}

export default ProjectsPage
