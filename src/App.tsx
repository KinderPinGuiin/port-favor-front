import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Authentication from "@page/authentication/Authentication";
import MustBeLoggedInRoute from "@component/MustBeLoggedInRoute/MustBeLoggedInRoute";
import MustBeLoggedOutRoute from "@component/MustBeLoggedOutRoute/MustBeLoggedOutRoute";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Logout from "@page/authentication/Logout";
import NavbarLayout from "layout/NavbarLayout/NavbarLayout";
// import { AuthenticationButtonLayout } from "layout/AuthenticationButtonLayout/AuthenticationButtonLayout";
// import { HomeButtonLayout } from "layout/HomeButtonLayout/HomeButtonLayout";

function App() {
  // Defining all the application routes
  const router = createBrowserRouter([
    {
      element: <NavbarLayout children={undefined} />,
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/",
      element: <Home />
    },
    {
      element: <MustBeLoggedInRoute />,
      children: [
        {
          path: "/blabla"
        }
      ]
    },
    {
      element: <MustBeLoggedOutRoute />,
      children: [
        {
          path: "/authentication",
          element: <Authentication />
        }
      ]
    }
  ]);

  // Create the application theme
  const primaryColor = "#223A54"
  const secondaryColor = "#FFF6FF"
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: primaryColor,
      },
      secondary: {
        main: secondaryColor,
        light: secondaryColor
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
        <RouterProvider router={router}>
        </RouterProvider>
      </ThemeProvider>
    </React.StrictMode>  
  )
}

export default App
