import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (user, pass) => {
        if (user === "admin" && pass === "admin") {
            setUser(user);
            localStorage.setItem('isLoggedIn', true);
            setIsLoggedIn(true);
        }
        else {
            setUser(null);
            localStorage.setItem('isLoggedIn', false);
            setIsLoggedIn(false);
        }
        return isLoggedIn;
    }

    // const login = (user, pass) => {
    //     setUser(user);
    //     localStorage.setItem('isLoggedIn', true);
    //     setIsLoggedIn(true);

    // }

    const logout = () => {
        setUser(null)
        localStorage.setItem('isLoggedIn', false);
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);