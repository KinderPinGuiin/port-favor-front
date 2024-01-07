import { HomeButtonLayout } from "layout/HomeButtonLayout/HomeButtonLayout";
import { UserButtonLayout } from "layout/UserButtonLayout/UserButtonLayout";
import { PortfolioButtonLayout } from "layout/PortfolioButtonLayout/PortfolioButtonLayout";
import { Outlet } from "react-router";
import { useTheme } from "@mui/material";
import Stack from '@mui/material/Stack';
import { DashboardButtonLayout } from "layout/DashboardButtonLayout/DashboardButtonLayout";

export default function NavbarLayout() {
  const theme = useTheme();

  return (
    <>
      {
        <Stack direction="row" spacing={1} justifyContent="center" sx={{
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
          borderRadius: "50px",
        }}>
          <HomeButtonLayout />
          <PortfolioButtonLayout />
          <UserButtonLayout />
          <DashboardButtonLayout />
        </Stack>
      }
        <Outlet />
    </>
  );
 }
 
