import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from "@mui/material";

/**
 * Layout adding a logout button when the route isn't "/" and "/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function AuthenticationButtonLayout() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      {
        location.pathname !== "/" && location.pathname !== "/authentication" 
        && localStorage.getItem("token") !== null &&
        <Link 
          to={"/logout"} 
          style={{
            color: theme.palette.primary.light,
          }}>
          <LogoutIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
      {
        location.pathname !== "/" && location.pathname !== "/authentication" 
        && localStorage.getItem("token") == null &&
        <Link 
          to={"/authentication"} 
          style={{
            color: theme.palette.primary.light,
          }}>
          <LoginIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
    </>
  )
}