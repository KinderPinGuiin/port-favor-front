import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeAdminRoute() {
    const rolesJson = localStorage.getItem("roles");
    let roles = [];
    if (rolesJson) {
     roles = JSON.parse(rolesJson);
    }
    const containsAdmin = roles.some((role: { name: string; }) => role.name === "ADMIN");
    return containsAdmin ? <Outlet /> : <Navigate to="/" />;
}