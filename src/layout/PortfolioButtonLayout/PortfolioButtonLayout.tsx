import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useTheme } from "@mui/material";

/**
 * Layout adding a portfolio button when the route isn't "/portfolio".
 */
export function PortfolioButtonLayout() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      {
        location.pathname !== "/portfolio" &&
        <Link 
          to={"/portfolio"} 
          style={{
            color: theme.palette.primary.light
          }}>
            <InsertPhotoIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      }
    </>
  )
}