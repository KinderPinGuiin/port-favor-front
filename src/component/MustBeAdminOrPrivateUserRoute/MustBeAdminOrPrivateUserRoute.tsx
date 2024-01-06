import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeAdminRoute() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(localStorage.getItem("token")));
    const [roles, setRoles] = useState<{ name: string }[]>([]);
  
    useEffect(() => {
      window.addEventListener('storage', () => {
        setIsLoggedIn(Boolean(localStorage.getItem("token")));
        const rolesJson = localStorage.getItem("roles");
        if (rolesJson) {
          setRoles(JSON.parse(rolesJson));
        }
      });
    }, []);
  
    const containsAdmin = roles.some((role) => role.name === "ADMIN");
    const containsPrivateUser = roles.some((role) => role.name === "PRIVATE_USER");
    console.log(containsAdmin, containsPrivateUser);
    return (isLoggedIn && (containsAdmin || containsPrivateUser)) ? <Outlet /> : <Navigate to="/" />;
}