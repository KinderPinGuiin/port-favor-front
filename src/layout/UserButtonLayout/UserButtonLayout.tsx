import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React from "react";

/**
 * Layout adding a logout button when the route isn't "/" and "user/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function UserButtonLayout() {
  const theme = useTheme();
  const [anchorElLogout, setAnchorElLogout] = React.useState<null | HTMLElement>(null);
  const [anchorElLogin, setAnchorElLogin] = React.useState<null | HTMLElement>(null);
  const openLogout = Boolean(anchorElLogout);
  const openLogin = Boolean(anchorElLogin);

  const handleClickLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLogout(event.currentTarget);
  };

  const handleClickLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handleCloseLogout = () => {
    setAnchorElLogout(null);
  };

  const handleCloseLogin = () => {
    setAnchorElLogin(null);
  };

  return (
    <>
      {
        localStorage.getItem("token") !== null &&
        <>
        <Button
        id="basic-button"
        aria-controls={openLogout ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openLogout ? 'true' : undefined}
        onClick={handleClickLogout}
        style={{
          color: theme.palette.primary.light,
        }}>
        Utilisateur
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElLogout}
        open={openLogout}
        onClose={handleCloseLogout}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
        <Link 
          to={"user/logout"} 
          style={{
            color: theme.palette.primary.light,
            textDecoration: "none",
          }}>
          Déconnecter
        </Link>
        </MenuItem>
        <MenuItem>
        <Link 
          to={"user/modify"} 
          style={{
            color: theme.palette.primary.light,
            textDecoration: "none",
          }}>
          Modifier le profil
        </Link>
        </MenuItem>
      </Menu>
      </>
      }
      {
        localStorage.getItem("token") == null &&
        <>
        <Button
        id="basic-button"
        aria-controls={openLogin ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openLogin ? 'true' : undefined}
        onClick={handleClickLogin}
        style={{
          color: theme.palette.primary.light,
        }}>
        Utilisateur
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElLogin}
        open={openLogin}
        onClose={handleCloseLogin}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
        <Link 
          to={"user/authentication"} 
          style={{
            color: theme.palette.primary.light,
            textDecoration: "none",
          }}>
          S'authentifier
        </Link>
        </MenuItem>
      </Menu>
      </>
      }
    </>
  )
}