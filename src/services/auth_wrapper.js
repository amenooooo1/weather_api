import { Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home';

const AuthWrapper = () => {
    const location = useLocation(); // current location

    const userLogged = localStorage.getItem('isLoggedIn');

    return (userLogged === 'false' || userLogged === undefined || userLogged === null)
        ? <Navigate
            to="/home"
            replace
            state={{ from: location }} // <-- pass location in route state
        />
        : (
            <Navigate
                to="/login"
                replace
                state={{ from: location }} // <-- pass location in route state
            />
        );
};

export default AuthWrapper;