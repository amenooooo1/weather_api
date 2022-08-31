import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";



export const RequireAuth = ({ children }) => {

    const auth = useAuth();
    if (localStorage.getItem('isLoggedIn') === 'false') {
        return <Navigate to={"/login"} />
    }
    return children;
}

