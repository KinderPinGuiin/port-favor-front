import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React from "react";

/**
 * Layout adding a logout button when the route isn't "/" and "user/authenticate" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function UserButtonLayout() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {
        localStorage.getItem("token") !== null &&
        <>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          color: theme.palette.primary.light,
        }}>
        Utilisateur
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          color: theme.palette.primary.light,
        }}>
        Utilisateur
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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