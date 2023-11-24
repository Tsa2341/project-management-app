import { ThemeProvider } from "@emotion/react"
import GroupIcon from "@mui/icons-material/Group"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import ReorderIcon from "@mui/icons-material/Reorder"
import {
  Avatar,
  Divider,
  Hidden,
  IconButton,
  List,
  Stack,
  SwipeableDrawer,
  Typography,
  styled
} from "@mui/material"
import clsx from "clsx"
import React, { memo } from "react"
import { darkTheme } from "../../theme"
import NavBarItem from "./NavBarItem"

const navbarWidth = 280

const StyledNavBar = styled("div")(({ theme, open, position }) => ({
  minWidth: navbarWidth,
  width: navbarWidth,
  maxWidth: navbarWidth,
  background: theme.palette.background.paper,

  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(position === "left" && {
      marginLeft: `-${navbarWidth}px`
    }),
    ...(position === "right" && {
      marginRight: `-${navbarWidth}px`
    })
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))
const StyledList = styled(List)(({ theme }) => ({
  padding: 4,

  "& .fuse-list-item": {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)"
    },
    "&:focus:not(.active)": {
      backgroundColor: "rgba(255, 255, 255, 0.06)"
    },
    padding: "8px 12px 8px 12px",
    height: 40,
    minHeight: 40,
    "& .fuse-list-item-text": {
      padding: "0 0 0 8px"
    }
  }
}))

const StyledNavBarMobile = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth
  }
}))

const NavBar = ({ open, setOpen }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Hidden mdDown>
        <StyledNavBar
          className="flex-col flex-auto sticky top-0 overflow-hidden h-screen shrink-0 z-20 shadow-5"
          open={open}
          position="left"
        >
          <NavBarContent {...{ setOpen, open }} />
        </StyledNavBar>
      </Hidden>

      <Hidden mdUp>
        <StyledNavBarMobile
          classes={{
            paper: "flex-col flex-auto h-full"
          }}
          anchor="left"
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <NavBarContent {...{ setOpen, open }} />
        </StyledNavBarMobile>
      </Hidden>
    </ThemeProvider>
  )
}

const NavBarContent = ({ setOpen, open }) => {
  return (
    <Stack className="flex flex-auto flex-col overflow-hidden h-full">
      <div className="flex flex-row items-center shrink-0 h-48 md:h-72 px-20">
        <IconButton
          className="w-40 h-40 p-0"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen((open) => !open)
          }}
        >
          <ReorderIcon size={20} color="action" />
        </IconButton>
      </div>

      <Stack className="flex flex-1 flex-col min-h-0">
        <Stack className="user relative flex flex-col items-center justify-center p-16 pb-14 shadow-0">
          <div className="flex items-center justify-center mb-24">
            <Avatar
              sx={{
                backgroundColor: "background.paper",
                color: "text.secondary"
              }}
              className="avatar text-32 font-bold w-96 h-96 border-[0.5px] border-white"
              // src={user.data.photoURL}
              alt="avatar"
            >
              A
            </Avatar>
          </div>
          <Typography className="username text-14 whitespace-nowrap font-medium text-white">
            Manager
          </Typography>
          <Typography
            className="email text-13 whitespace-nowrap font-medium"
            color="text.secondary"
          >
            email@gmail.com
          </Typography>
        </Stack>

        <StyledList
          className={clsx(
            "navigation whitespace-nowrap px-12 py-12 h-full flex flex-col"
          )}
        >
          <NavBarItem
            item={{
              url: "/dashboard/projects",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-20 h-20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
              title: "projects"
            }}
            onItemClick={() => {
              console.log("CLicked")
            }}
          />
          <NavBarItem
            item={{
              url: "/dashboard/users",
              icon: <GroupIcon size="20" />,
              title: "users"
            }}
            onItemClick={() => {
              console.log("CLicked")
            }}
          />

          <Divider variant="fullWidth" className=" bg-white mt-auto mb-8" />
          <NavBarItem
            item={{
              url: "/dashboard/profile",
              icon: <PersonIcon size="20" />,
              title: "profile"
            }}
            onItemClick={() => {
              console.log("CLicked")
            }}
          />
          <NavBarItem
            item={{
              url: "/logout",
              icon: <LogoutIcon size="20" />,
              title: "Sign out",
              className: "self-end"
            }}
            onItemClick={() => {
              console.log("CLicked")
            }}
          />
        </StyledList>
      </Stack>
    </Stack>
  )
}

export default memo(NavBar)
