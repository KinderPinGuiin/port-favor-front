import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeAdminRoute() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(localStorage.getItem("token")));
    const [roles, setRoles] = useState<{ name: string }[]>([]);
  
    useEffect(() => {
      window.addEventListener('storage', () => {
        console.log("bebeb");
        setIsLoggedIn(Boolean(localStorage.getItem("token")));
        const rolesJson = localStorage.getItem("roles");
        console.log(rolesJson);
        if (rolesJson) {
          setRoles(JSON.parse(rolesJson));
        }
      });
    }, []);
  
    console.log(roles);
    const containsAdmin = roles.some((role) => role.name === "ADMIN");
    return (isLoggedIn && containsAdmin) ? <Outlet /> : <Navigate to="/" />;
}