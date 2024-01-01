import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React from "react";

/**
 * Layout adding a logout button when the route isn't "/" and "user/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function DashboardButtonLayout() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const rolesJson = localStorage.getItem("roles");
  let roles = [];
  if (rolesJson) {
   roles = JSON.parse(rolesJson);
  }
  const containsAdmin = roles.some((role: { name: string; }) => role.name === "ADMIN");
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
        containsAdmin &&
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