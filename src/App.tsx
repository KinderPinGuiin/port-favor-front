import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@page/home/Home";
import Login from "@page/login/Login";

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
    }
  ]);

  return (
    <React.StrictMode>
      {/* Providing the router inside the application */}
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>  
  )
}

export default App
