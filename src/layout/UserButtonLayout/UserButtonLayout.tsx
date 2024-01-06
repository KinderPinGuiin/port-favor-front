import { Link, useLocation } from "react-router-dom";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

/**
 * Layout adding a logout button when the route isn't "/" and "user/authentication" and the user is logged in,
 * or a login button if the user isn't logged in.
 */
export function UserButtonLayout() {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [roles, setRoles] = useState<{ name: string }[]>(JSON.parse(localStorage.getItem("roles") || "[]"));
  const [containsAdmin, setContainsAdmin] = useState(roles.some((role) => role.name === "ADMIN"));
  const [containsPrivateUser, setContainsPrivateUser] = useState(roles.some((role) => role.name === "PRIVATE_USER"));

  useEffect(() => {
    const updateLocalStorageData = () => {
      const token = Boolean(localStorage.getItem("token"));
      setIsLoggedIn(token);
      const rolesJson = localStorage.getItem("roles");
      if (rolesJson) {
        const newRoles = JSON.parse(rolesJson);
        setRoles(newRoles);
        setContainsAdmin(newRoles.some((role: { name: string; }) => role.name === "ADMIN"));
        setContainsPrivateUser(newRoles.some((role: { name: string; }) => role.name === "PRIVATE_USER"));
      }
    };
    window.addEventListener('storage', updateLocalStorageData);
    return () => {
      window.removeEventListener('storage', updateLocalStorageData);
    };
  }, []);

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
        isLoggedIn &&
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
        { (containsAdmin || containsPrivateUser) &&
        <Link 
          to={"user/modify"} 
          style={{
            color: theme.palette.primary.light,
            textDecoration: "none",
          }}>
          Modifier le profil
        </Link>
        }
        </MenuItem>
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
        <MenuItem onClick={handleClose}>
          Fermer
        </MenuItem>
      </Menu>
      </>
      }
      {
        !isLoggedIn &&
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          Se connecter
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