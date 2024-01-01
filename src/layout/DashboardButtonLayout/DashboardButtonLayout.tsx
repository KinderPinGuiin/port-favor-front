import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router";

/**
 * Layout adding a logout button when the route isn't "/" and "user/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function DashboardButtonLayout() {
  const theme = useTheme();
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {
        // TODO ajouter condition que l'utilisateur doit être admin
        location.pathname.includes("/portfolio") &&
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
        Administration
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
          to={"admin/users"} 
          onClick={() => setOpen(false)}
          style={{
            color: theme.palette.primary.light,
            textDecoration: "none",
          }}>
          Gérer les utilisateurs
        </Link>
        </MenuItem>
        <MenuItem>
        <Link 
          to={"admin/images"} 
          onClick={() => setOpen(false)}
          style={{
            color: theme.palette.primary.light,
            textDecoration: "none",
          }}>
          Gérer les images
        </Link>
        </MenuItem>
      </Menu>
      </>
    }
    </>
  )
}