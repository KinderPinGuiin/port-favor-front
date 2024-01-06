import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function MustBeLoggedInRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const updateLocalStorageData = () => {
      const token = Boolean(localStorage.getItem("token"));
      setIsLoggedIn(token);
    };
    window.addEventListener('storage', updateLocalStorageData);
    return () => {
      window.removeEventListener('storage', updateLocalStorageData);
    };
  }, []);
  
  return isLoggedIn ? <Outlet /> : <Navigate to="user/authentication" />;
}