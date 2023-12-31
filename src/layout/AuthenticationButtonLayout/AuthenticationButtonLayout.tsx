import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import LogginIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from "@mui/material";

/**
 * Layout adding a logout button when the route isn't "/" and "/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function AuthenticationButtonLayout() {
  const theme = useTheme();
  const location = useLocation();
  console.log("baba");
  console.log(localStorage.getItem("token"));

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
      {
        location.pathname !== "/" && location.pathname != "/authentication" 
        && localStorage.getItem("token") != null &&
        <Link 
          to={"/logout"} 
          style={{
            position: "absolute", 
            top: 20, 
            left: 50,
            textDecoration: "none", 
            color: theme.palette.primary.main,
          }}>
          <LogginIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
      {
        location.pathname !== "/" && location.pathname != "/authentication" 
        && localStorage.getItem("token") == null &&
        <Link 
          to={"/authentication"} 
          style={{
            position: "absolute", 
            top: 20, 
            left: 50,
            textDecoration: "none", 
            color: theme.palette.primary.main,
          }}>
            <LogoutIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
      </div>
      <Outlet />
    </>
  )
}