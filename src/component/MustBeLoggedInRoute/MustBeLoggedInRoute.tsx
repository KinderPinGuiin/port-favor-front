import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeLoggedInRoute() {
 const token = localStorage.getItem('token');
 return token ? <Outlet /> : <Navigate to="user/authenticate" />;
}