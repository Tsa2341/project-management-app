import { Avatar, Box, Paper, Typography } from "@mui/material"
import React from "react"
import DetailsHeader from "../../components/DetailsHeader"
import { useSelector } from "react-redux"
import { selectProjectById } from "../../store/reducers/projects.reducer"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import CustomTable from "../../components/table/CustomTable"
import formatDate from "../../utils/formatDate"
import StatusDot from "../../components/StatusDot"
import CountryFlag from "../../components/CountryFlag"

const tasksRows = [
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
    align: "center",
    disablePadding: false,
    label: "Created At",
    sort: true,
    format: formatDate
  },
  {
    id: "file",
    align: "right",
    disablePadding: false,
    label: "File",
    sort: true,
    format: (value) => {
      return value ? (
        <div onClick={(e) => e.stopPropagation()}>
          <a href={value} download={value} className="break-all">
            {value}
          </a>
        </div>
      ) : (
        "No FIle"
      )
    }
  }
]

const usersRow = [
  {
    id: "avatar",
    align: "left",
    disablePadding: false,
    label: "Image",
    sort: true,
    format: (url, row) => {
      return (
        <Avatar className="w-40 h-40" src={url} alt={row.fname + "avatar"}>
          {row.fname[0] || "A"}
        </Avatar>
      )
    }
  },
  {
    id: "username",
    align: "left",
    disablePadding: false,
    label: "User Name",
    sort: true
  },
  {
    id: "fname",
    align: "center",
    disablePadding: false,
    label: "First Name",
    sort: true
  },
  {
    id: "lname",
    align: "center",
    disablePadding: false,
    label: "Phone NUmber",
    sort: true
  },
  {
    id: "location",
    align: "center",
    disablePadding: false,
    label: "Address",
    sort: true
  },
  {
    id: "phone",
    align: "center",
    disablePadding: false,
    label: "Phone Number",
    sort: true
  },
  {
    id: "country",
    align: "center",
    disablePadding: false,
    label: "Country",
    sort: true,
    format: (country) => {
      return (
        <span>
          <CountryFlag country={country} />
          {country}
        </span>
      )
    }
  },
  {
    id: "role",
    align: "center",
    disablePadding: false,
    label: "Role",
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
    id: "createdAt",
    align: "center",
    disablePadding: false,
    label: "Joined",
    sort: true,
    format: formatDate
  }
]

const ProjectDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = useSelector((state) => selectProjectById(state, id))

  if (!project) {
    return <Loading />
  }

  const { name, description, status, Users, Tasks } = project

  return (
    <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
      <DetailsHeader {...{ status, to: "/dashboard/projects", title: name }} />
      <Paper elevation={1} className="w-full h-max p-24 px-32 mt-14">
        <Typography className="text-lg font-bold">Description</Typography>
        <Typography>{description}</Typography>
      </Paper>

      <Paper className="mt-16">
        <Typography
          className="text-2xl font-extrabold m-20"
          color="text.secondary"
        >
          Project&apos;s Tasks
        </Typography>
        <Box className="overflow-auto mb-20">
          <CustomTable
            data={Tasks}
            handleClick={(n) => navigate("/dashboard/tasks/id")}
            rows={tasksRows}
          />
        </Box>
      </Paper>

      <Paper className="mt-16">
        <Typography
          className="text-2xl font-extrabold m-20"
          color="text.secondary"
        >
          Project&apos;s Users
        </Typography>
        <Box className="overflow-auto mb-20">
          <CustomTable
            name="users"
            data={Users}
            handleClick={(n) => navigate("/dashboard/users/id")}
            rows={Users.length > 0 ? usersRow : null}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default ProjectDetailsPage