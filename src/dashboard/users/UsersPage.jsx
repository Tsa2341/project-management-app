import AddRoundedIcon from "@mui/icons-material/AddRounded"
import { Avatar, Box, Button, Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header"
import StatusDot from "../../components/StatusDot"
import CustomTable from "../../components/table/CustomTable"
import { getAllUsers, selectAllUsers } from "../../store/reducers/users.reducer"
import formatDate from "../../utils/formatDate"
import UserCreateModal from "./partials/UserCreateModal"
import CountryFlag from "../../components/CountryFlag"

const rows = [
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

const UsersPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const users = useSelector(selectAllUsers)
  const [userCreateModalOpen, setUserCreateModalOpen] = useState(false)

  const handleClick = (n) => {
    navigate(`/dashboard/users/${n.id}`)
  }

  useEffect(() => {
    if (location.pathname === "/dashboard/users/create") {
      setUserCreateModalOpen(true)
    } else {
      setUserCreateModalOpen(false)
    }
  }, [location.pathname])

  if (id) {
    return <Outlet />
  }

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
        <Header
          title="Users"
          actions={[
            <Button
              variant="contained"
              color="secondary"
              key={1}
              onClick={() => {
                navigate("/dashboard/users/create")
              }}
            >
              <AddRoundedIcon className="w-40" />
              <Typography>Create User</Typography>
            </Button>
          ]}
        />
        <Paper className="overflow-auto mt-14 min-h-36" elevation={0}>
          <CustomTable rows={rows} handleClick={handleClick} data={users} />
        </Paper>
      </Box>
      {userCreateModalOpen && <UserCreateModal />}
    </>
  )
}

export default UsersPage
