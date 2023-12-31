import { HomeButtonLayout } from "layout/HomeButtonLayout/HomeButtonLayout";
import { AuthenticationButtonLayout } from "layout/AuthenticationButtonLayout/AuthenticationButtonLayout";
import { InfosLayout } from "layout/InfosLayout/InfosLayout";
import { Outlet } from "react-router";
import { useTheme } from "@mui/material";
import Stack from '@mui/material/Stack';

export default function NavbarLayout() {
  const theme = useTheme();

  return (
    <>
    #TODO regarder pourquoi la barre disparait après un rechargement de page
      {
        location.pathname !== "/" || location.pathname == "/" && localStorage.getItem("token") !== null &&
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{
          position: "fixed", 
          bottom: 3,
          height: "50px",
          left: '50%', 
          transform: 'translateX(-50%)', 
          color: theme.palette.primary.light,
          backgroundColor: theme.palette.background.default,
          border: "4px solid",
          borderColor: theme.palette.primary.light,
          display: 'flex',
          padding: '10px',
          zIndex: 1,
          borderRadius: "50px"
        }}>
          <HomeButtonLayout />
          <AuthenticationButtonLayout />
          <InfosLayout />
        </Stack>
      }
        <Outlet />
    </>
  );
 }
 
