import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from "@mui/material";

/**
 * Layout adding a home button when the route isn't "/".
 */
export function HomeButtonLayout() {
  const theme = useTheme();
  const location = useLocation()

  return (
    <>
      {
        location.pathname !== "/" &&
        <Link
          to={"/"} 
          style={{
            color: theme.palette.primary.light,
            display: 'flex',
            alignItems: 'center',
          }}>
            <HomeIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
    </>
  )
}