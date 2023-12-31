import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeLoggedOutRoute() {
 const token = localStorage.getItem('token');
 return token ? <Navigate to="/" /> : <Outlet /> ;
}