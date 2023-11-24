import { Stack } from "@mui/material"
import { useCallback, useLayoutEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import useThemeMediaQuery from "../hooks/useThemeMediaQuery"
import NavBar from "./partials/NavBar"
import ToolBar from "./partials/ToolBar"

const DashBoard = () => {
  const navigate = useNavigate()
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("md"))
  const [openNavBar, setOpenNavBar] = useState(isMobile ? false : true)

  const handleToggleNavBar = useCallback(() => {
    setOpenNavBar(!openNavBar)
  }, [openNavBar])

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      return navigate("/login")
    }
  }, [])

  return (
    <>
      <Stack className="w-full h-full">
        <div className="flex flex-auto min-w-0">
          <NavBar open={openNavBar} setOpen={setOpenNavBar} />

          <main className="flex flex-col flex-auto min-h-full min-w-0 relative z-10">
            <ToolBar
              {...{ openNavBar, handleToggleNavBar }}
              className="sticky top-0"
            />

            <div className="flex flex-col flex-auto min-h-0 relative z-10">
              <Outlet />
            </div>
          </main>
        </div>
      </Stack>
    </>
  )
}

export default DashBoard
