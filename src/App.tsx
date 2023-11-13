import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Login from "@page/login/Login";
import { createTheme, ThemeProvider } from "@mui/material";
import Portfolio from "@page/portfolio/Portfolio";

function App() {
  // Defining all the application routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/portfolio",
      element: <Portfolio />
    }
  ]);

  // Create the application theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#223A54",
        light: "#223A54",
      },
      secondary: {
        main: "#F94F5A",
        light: "#F94F5A"
      },
      background: {
        default: "#FFF6FF"
      }
    },
  })

  return (
    <React.StrictMode>
      {/* Provide the application theme */}
      <ThemeProvider theme={theme}>
        {/* Providing the router inside the application */}
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </React.StrictMode>  
  )
}

export default App
