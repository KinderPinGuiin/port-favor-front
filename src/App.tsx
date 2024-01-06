import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Authentication from "@page/user/Authentication";
import MustBeLoggedOutRoute from "@component/MustBeLoggedOutRoute/MustBeLoggedOutRoute";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Logout from "@page/user/Logout";
import NavbarLayout from "layout/NavbarLayout/NavbarLayout";
import Modify from "@page/user/Modify";
import Portfolio from "@page/portfolio/Portfolio";
import Users from "@page/admin/Users";
import Images from "@page/admin/Images";
import MustBeLoggedInRoute from "@component/MustBeLoggedInRoute/MustBeLoggedInRoute";
import MustBeAdminRoute from "@component/MustBeAdminRoute/MustBeAdminRoute";
import MustBeAdminOrPrivateUserRoute from "@component/MustBeAdminOrPrivateUserRoute/MustBeAdminOrPrivateUserRoute";

function App() {
  // Defining all the application routes
  const router = createBrowserRouter([
    {
      element: <NavbarLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/portfolio",
          element: <Portfolio />
        },
        {
          element: <MustBeLoggedInRoute />,
          children: [
            {
              path: "/user/logout",
              element: <Logout />
            },
          ]
        },
        {
          element: <MustBeAdminRoute />,
          children: [
            {
              path: "/admin/users",
              element: <Users />
            },
            {
              path: "/admin/images",
              element: <Images />
            }
          ]
        },
        {
          element: <MustBeAdminOrPrivateUserRoute />,
          children: [
            {
              path: "/user/modify",
              element: <Modify />
            }
          ]
        },
        {
          element: <MustBeLoggedOutRoute />,
          children: [
            {
              path: "/user/authentication",
              element: <Authentication />
            }
          ]
        }
      ]
    }
  ]);

  // Create the application theme
  const primaryColor = "#223A54"
  const secondaryColor = "#FFF6FF"
  const lightPrimaryColor = "black"
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: lightPrimaryColor,
      },
      secondary: {
        main: "#F94F5A",
        light: "#F94F5A"
      },
      background: {
        default: "#FFF6FF"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: secondaryColor,
          }
        }
      }
    }
  })

  return (
    <React.StrictMode>
      {/* Provide the application theme */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Providing the router inside the application */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>  
  )
}

export default App
