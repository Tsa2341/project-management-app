import { yupResolver } from "@hookform/resolvers/yup"
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import React, { memo, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import countries from "../../../utils/countries"
import { useNavigate } from "react-router-dom"
import { selectUser } from "../../../store/reducers/auth.reducer"
import Loading from "../../../components/Loading"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import CountryFlag from "../../../components/CountryFlag"

const schema = yup.object().shape({
  username: yup.string().required("You must enter your user name"),
  fname: yup.string().required("You must enter your first name"),
  lname: yup.string().required("You must enter your last name"),
  phone: yup.number().required("You must enter your phone number"),
  country: yup.string().required("You must enter your country"),
  location: yup.string().required("You must enter your Address"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter your email"),
  password: yup.string().required("Please enter your password.")
})

const defaultValues = {
  fname: "",
  lname: "",
  image: "",
  phone: "",
  country: "Rwanda",
  location: "",
  email: "",
  username: "",
  password: ""
}

const EditProfileModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
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
    !loading && navigate("/dashboard/profile")
  }

  const onSubmit = (form) => {
    setLoading(true)
    // dispatch(authRegister(formData)).then(({ error, payload }) => {
    //   if (error) {
    //     toast.error(error.message)
    //   } else {
    //     console.log(payload)
    //   }
    //   setLoading(false)
    // })
  }

  useEffect(() => {
    if (user) {
      console.log(user)
      Object.keys(defaultValues).map((key) => {
        setValue(key, user[key], { shouldDirty: true, shouldTouch: true })
      })
    }
  }, [user])

  if (!user) {
    return <Loading />
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
            Edit Profile
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
          <Stack direction="row" gap={1} className="items-center mb-24">
            <Box className="aspect-square h-[100px]">
              <Avatar
                sx={{
                  backgroundColor: "background.default",
                  color: "text.secondary"
                }}
                className="object-cover w-full h-full text-64 font-bold"
                src={watch("image")}
                alt="image url"
              >
                {(watch("image") || "A")[0]}
              </Avatar>
            </Box>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image Url"
                  autoFocus
                  type="text"
                  error={!!errors.image}
                  helperText={errors?.image?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>

          <Grid columnSpacing={2} container>
            <GridItem>
              <Controller
                name="fname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="First name"
                    autoFocus
                    type="name"
                    error={!!errors.fname}
                    helperText={errors?.fname?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="lname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Last name"
                    autoFocus
                    type="name"
                    error={!!errors.lname}
                    helperText={errors?.lname?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="User name"
                    autoFocus
                    type="name"
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Phone Number"
                    autoFocus
                    type="tel"
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <FormControl required fullWidth>
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                      {...field}
                      id="country"
                      className="mb-24"
                      label="Country"
                      autoFocus
                      type="text"
                      error={!!errors.country}
                      variant="outlined"
                      required
                      fullWidth
                      startAdornment={
                        countries.find(
                          (country) => country.name === watch("country")
                        ) && (
                          <InputAdornment position="start">
                            <CountryFlag country={watch("country")} />
                          </InputAdornment>
                        )
                      }
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.iso} value={country.name}>
                          <Box
                            component="span"
                            className="w-24 h-16 overflow-hidden"
                            sx={{
                              background:
                                "url('/images/flags.png') no-repeat 0 0",
                              backgroundSize: "24px 3876px",
                              backgroundPosition: country.flagImagePos
                            }}
                          />
                          <span className="ml-8 font-medium">
                            {country.name}
                          </span>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Address"
                    type="text"
                    error={!!errors.location}
                    helperText={errors?.location?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </GridItem>
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
            Edit Profile
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}

const GridItem = ({ children }) => {
  return (
    <Grid item xs={12} sm={6}>
      {children}
    </Grid>
  )
}

export default memo(EditProfileModal)
