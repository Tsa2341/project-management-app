import { yupResolver } from "@hookform/resolvers/yup"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { addDays } from "date-fns"
import React, { memo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { selectAllProjects } from "../../../store/reducers/projects.reducer"
import { createTask, getAllTasks } from "../../../store/reducers/tasks.reducer"

const schema = yup.object().shape({
  name: yup.string().required("You must enter the task name"),
  description: yup.string().required("You must enter the task description"),
  file: yup
    .mixed()
    .test(
      "fileSize",
      "The file is too large. Use atl east less than 200mb",
      (value) => {
        if (!value.length) return true
        return value[0].size <= 200000
      }
    )
    .required("You must enter the task file"),
  start_date: yup
    .date()
    .min(new Date(), "Start Date can't be before now")
    .required("You must enter the task Start Date"),
  end_date: yup
    .date()
    .min(yup.ref("start_date"), "End Date can't be before Start Date")
    .required("You must enter the task End Date"),
  project_id: yup
    .string()
    .required("You must enter the project to associate to this task")
})

const defaultValues = {
  name: "",
  description: "",
  file: null,
  start_date: new Date(),
  end_date: new Date(addDays(new Date(), 1)),
  project_id: ""
}

const TaskCreateModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const projects = useSelector(selectAllProjects)
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    !loading && navigate("/dashboard/tasks")
  }

  const onSubmit = (form) => {
    console.log(form)
    setLoading(true)
    dispatch(createTask(form)).then(({ error, payload }) => {
      if (error) {
        toast.error(error.message)
        setLoading(false)
      } else {
        toast.success("Task created Successfully!")
        dispatch(getAllTasks()).then(({ error, payload }) => {
          if (error) {
            toast.error(error.message)
          }
          setLoading(false)
          handleClose()
        })
      }
    })
  }

  return (
    <Modal
      className="flex flex-col items-center w-full h-full p-16 overflow-auto"
      open={true}
      onClose={handleClose}
    >
      <Paper className="w-full max-w-3xl h-max py-16 px-20">
        <Stack
          direction="row"
          gap={2}
          className="w-full items-center justify-between"
        >
          <Typography color="text.secondary" className="text-4xl font-bold">
            Create Task
          </Typography>

          <IconButton onClick={handleClose} className="w-40 h-40">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <form
          name="editProfileForm"
          noValidate
          className="flex flex-col justify-center w-full pt-32"
          onSubmit={handleSubmit(onSubmit, (...props) => {
            console.error(props)
          })}
        >
          <Grid columnSpacing={2} container>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Task Name"
                    autoFocus
                    type="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Description"
                    autoFocus
                    type="text"
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    minRows={2}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="File"
                    autoFocus
                    type="file"
                    error={!!errors.file}
                    helperText={errors?.file?.message}
                    variant="outlined"
                    fullWidth
                    required
                    minRows={2}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <div className="mb-24 w-full">
                    <DatePicker
                      {...field}
                      label="Start Date"
                      variant="outlined"
                      error={!!errors.start_date}
                      disablePast
                      slotProps={{
                        textField: {
                          required: true,
                          fullWidth: true,
                          onKeyDownCapture: (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }
                        }
                      }}
                      fullWidth
                    />
                    {!!errors.start_date && (
                      <Typography color="error" className="ml-14 mt-4 text-12">
                        {errors?.start_date?.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <div className="mb-24 w-full">
                    <DatePicker
                      {...field}
                      label="End Date"
                      variant="outlined"
                      error={!!errors.end_date}
                      minDate={new Date(watch("start_date"))}
                      slotProps={{
                        textField: {
                          required: true,
                          fullWidth: true,
                          onKeyDownCapture: (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }
                        }
                      }}
                      fullWidth
                    />
                    {!!errors.end_date && (
                      <Typography color="error" className="ml-14 mt-4 text-12">
                        {errors?.end_date?.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <FormControl required fullWidth>
                    <InputLabel id="project_id">Choose Project</InputLabel>
                    <Select
                      {...field}
                      id="project_id"
                      className="mb-24"
                      label="Choose Project"
                      autoFocus
                      error={!!errors.project_id}
                      helperText={
                        !!errors.project_id && errors.project_id.message
                      }
                      variant="outlined"
                      required
                      fullWidth
                    >
                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Button
            role="button"
            variant="contained"
            color="secondary"
            className="w-full mt-24"
            aria-label="Register"
            disabled={loading}
            type="submit"
            size="large"
          >
            Create Task
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}

export default memo(TaskCreateModal)
