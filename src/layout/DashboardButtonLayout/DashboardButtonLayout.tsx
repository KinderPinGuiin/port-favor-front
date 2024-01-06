import { Link, useLocation } from "react-router-dom";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

/**
 * Layout adding a logout button when the route isn't "/" and "user/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function DashboardButtonLayout() {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [roles, setRoles] = useState<{ name: string }[]>(JSON.parse(localStorage.getItem("roles") || "[]"));
  const [containsAdmin, setContainsAdmin] = useState(roles.some((role) => role.name === "ADMIN"));

  useEffect(() => {
    const updateLocalStorageData = () => {
      const token = Boolean(localStorage.getItem("token"));
      setIsLoggedIn(token);
      const rolesJson = localStorage.getItem("roles");
      if (rolesJson) {
        const newRoles = JSON.parse(rolesJson);
        setRoles(newRoles);
        setContainsAdmin(newRoles.some((role: { name: string; }) => role.name === "ADMIN"));
      }
    };
    window.addEventListener('storage', updateLocalStorageData);
    return () => {
      window.removeEventListener('storage', updateLocalStorageData);
    };
  }, []);

  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAnchorEl(null);
   }, [location]);

  return (
    <>
      {
        isLoggedIn && containsAdmin &&
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
              style={{
                color: theme.palette.primary.light,
                textDecoration: "none",
              }}>
              Gérer les images
            </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Fermer
            </MenuItem>
          </Menu>
      </>
    }
    </>
  )
}