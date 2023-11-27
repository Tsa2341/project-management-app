import AddRoundedIcon from "@mui/icons-material/AddRounded"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"
import EditIcon from "@mui/icons-material/Edit"
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import CountryFlag from "../../components/CountryFlag"
import Header from "../../components/Header"
import StatusDot from "../../components/StatusDot"
import CustomTable from "../../components/table/CustomTable"
import {
  selectAllUsers,
  setSelectedUser
} from "../../store/reducers/users.reducer"
import formatDate from "../../utils/formatDate"
import UserCreateModal from "./partials/UserCreateModal"
import UserDeleteModal from "./partials/UserDeleteModal"
import UserEditModal from "./partials/UserEditModal"

export const UsersActions = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.stopPropagation()
    dispatch(setSelectedUser(user))
    navigate(`/dashboard/users/edit`)
  }
  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(setSelectedUser(user))
    navigate(`/dashboard/users/delete`)
  }

  return (
    <Box className="flex flex-row gap-1 items-center justify-center">
      <IconButton color="secondary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={handleDelete}>
        <DeleteForeverRoundedIcon />
      </IconButton>
    </Box>
  )
}

export const userRows = [
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
  },
  {
    id: "actions",
    align: "center",
    disablePadding: false,
    label: "Actions",
    sort: false,
    format: (_, n) => {
      return <UsersActions user={n} />
    }
  }
]

const UsersPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const users = useSelector(selectAllUsers)
  const [openUserModal, setOpenUserModal] = useState(false)

  const handleClick = (n) => {
    navigate(`/dashboard/users/${n.id}`)
  }

  useEffect(() => {
    if (location.pathname === "/dashboard/users/create") {
      setOpenUserModal("create")
    } else if (location.pathname === "/dashboard/users/edit") {
      setOpenUserModal("edit")
    } else if (location.pathname === "/dashboard/users/delete") {
      setOpenUserModal("delete")
    } else {
      setOpenUserModal(null)
    }
  }, [location.pathname])

  if (id) {
    return <Outlet />
  }

  return (
    <>
      <Box className="w-full h-full p-10 sm:p-[30px] flex flex-col">
        <Header title="Users" />
        <Paper className="overflow-auto mt-14 min-h-36" elevation={0}>
          <CustomTable rows={userRows} handleClick={handleClick} data={users} />
        </Paper>
      </Box>

      {openUserModal === "create" && <UserCreateModal />}
      {openUserModal === "edit" && <UserEditModal />}
      {openUserModal === "delete" && <UserDeleteModal />}
    </>
  )
}

export default UsersPage
