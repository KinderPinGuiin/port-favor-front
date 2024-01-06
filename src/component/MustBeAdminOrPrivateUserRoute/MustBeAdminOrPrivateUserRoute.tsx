import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeAdminRoute() {
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

  return (isLoggedIn && (containsAdmin || containsPrivateUser)) ? <Outlet /> : <Navigate to="/" />;
}