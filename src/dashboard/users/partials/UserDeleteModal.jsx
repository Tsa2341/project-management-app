import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography
} from "@mui/material"
import React, { memo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  deleteUser,
  selectSelectedUser
} from "../../../store/reducers/users.reducer"

const UserDeleteModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectSelectedUser)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    !loading && navigate("/dashboard/users")
  }

  const handleClick = () => {
    setLoading(true)
    dispatch(deleteUser({ id: user.id })).then(({ error, payload }) => {
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("User deleted Successfully!")
        handleClose()
      }
      setLoading(false)
    })
  }

  if (!user) {
    return
  }

  return (
    <Modal
      className="flex flex-col items-center w-full h-full p-16 overflow-auto"
      open={true}
      onClose={handleClose}
    >
      <Paper className="w-full max-w-sm h-max py-16 px-20 my-auto">
        <Stack
          direction="row"
          gap={2}
          className="w-full items-center justify-between"
        >
          <Typography color="text.secondary" className="text-4xl font-bold">
            Delete User
          </Typography>

          <IconButton onClick={handleClose} className="w-40 h-40">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Typography className="font-bold">
          You are about to delete <i>{user.name}</i> user!
        </Typography>
        <Typography>If you consent, click the button below.</Typography>

        <Button
          onClick={handleClick}
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="Register"
          disabled={loading}
          size="large"
        >
          Delete User
        </Button>
      </Paper>
    </Modal>
  )
}

export default memo(UserDeleteModal)