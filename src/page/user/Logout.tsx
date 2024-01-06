import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.clear();
        window.dispatchEvent(new Event('storage'));
        navigate("/");
    }, []);

    return null;
}