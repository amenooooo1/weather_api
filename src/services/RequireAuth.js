import { Navigate } from "react-router-dom";



export const RequireAuth = ({ children }) => {

    if (localStorage.getItem('isLoggedIn') === 'false' || localStorage.getItem('isLoggedIn') === undefined || localStorage.getItem('isLoggedIn') === null) {
        return <Navigate to={"/login"} />
    }
    return children;
}

