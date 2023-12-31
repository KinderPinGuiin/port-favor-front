import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from "@mui/material";

/**
 * Layout adding a home button when the route isn't "/".
 */
export function InfosLayout() {
  const theme = useTheme();
  const location = useLocation()

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
      {
        location.pathname !== "/" &&
        <Link 
          to={"/"} 
          style={{
            position: "absolute", 
            top: 90,
            textDecoration: "none", 
            color: theme.palette.primary.main,
          }}>
            <HomeIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
      </div>
      <Outlet />
    </>
  )
}