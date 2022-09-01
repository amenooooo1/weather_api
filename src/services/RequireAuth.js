import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";



export const RequireAuth = ({ children }) => {

    const auth = useAuth();
    if (localStorage.getItem('isLoggedIn') === 'false' || localStorage.getItem('isLoggedIn') === undefined || localStorage.getItem('isLoggedIn') === null) {
        return <Navigate to={"/login"} />
    }
    return children;
}

