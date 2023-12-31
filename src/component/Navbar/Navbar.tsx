import { useTheme } from "@mui/material";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { HomeButtonLayout } from "layout/HomeButtonLayout/HomeButtonLayout";
import { AuthenticationButtonLayout } from "layout/AuthenticationButtonLayout/AuthenticationButtonLayout";

function Navbar() {
    const theme = useTheme();
    
    return (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <Link to={"/"} style={{ position: "absolute", top: 20, left: 10, textDecoration: "none", color: theme.palette.primary.main }}>
            <HomeIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
        <HomeButtonLayout />
        <AuthenticationButtonLayout />
        </div>
    );
}

export default Navbar;
