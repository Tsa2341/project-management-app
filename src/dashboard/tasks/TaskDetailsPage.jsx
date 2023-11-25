import React from "react"
import DetailsHeader from "../../components/DetailsHeader"
import { Box, IconButton, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { selectTaskById } from "../../store/reducers/tasks.reducer"
import { Link, useNavigate, useParams } from "react-router-dom"
import CustomTable from "../../components/table/CustomTable"
import Loading from "../../components/Loading"
import { projectRows } from "../projects/ProjectsPage"
import { userRows } from "../users/UsersPage"

const TaskDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const task = useSelector((state) => selectTaskById(state, id))

  if (!task) return <Loading />

  const { name, status, description, Users, Projects, file } = task

  function downloadFile(url, fileName = "fileName.pdf") {
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement("a")
        aElement.setAttribute("download", fileName)
        const href = URL.createObjectURL(res)
        aElement.href = href
        aElement.setAttribute("target", "_blank")
        aElement.click()
        URL.revokeObjectURL(href)
      })
  }

  return (
    <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
      <DetailsHeader {...{ status, to: "/dashboard/tasks", title: name }} />
      <Paper elevation={1} className="w-full h-max p-24 px-32 mt-14">
        <Typography className="text-lg font-bold">Description</Typography>
        <Typography>{description}</Typography>
        <Box className="mt-20 bg-black/20 p-10 rounded-md flex flex-row gap-4 items-center justify-between">
          <Box className="flex flex-row gap-4 items-center truncate">
            <Typography className="font-semibold">Attached File</Typography>
            <Typography color="secondary" className="text-sm">
              {file}
            </Typography>
          </Box>
          <IconButton
            className="bg-white rounded aspect-square"
            onClick={() => downloadFile(file)}
          >
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </Box>
          </IconButton>
        </Box>
      </Paper>

      <CustomTable
        className="mt-16"
        title="Users"
        data={Users}
        handleClick={(n) => navigate(`/dashboard/users/${n.id}`)}
        rows={
          Users.length > 0
            ? userRows.filter((r) => !["actions"].includes(r.id))
            : null
        }
      />
    </Box>
  )
}

export default TaskDetailsPage
