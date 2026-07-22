import {createContext, useEffect, useState } from "react";
import API from "../services/API";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
    }

    const checkAuth = async() => {
        setLoading(true);
        try {
            const response = await API('GET', 'auth/profile');
            const info = response?.data?.data;
            setUser(info);
            return true;
        } catch (error) {
            console.log(error.response?.data?.message);
            setUser(null)
            return false;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    checkAuth();
}, []);

return (
    <AuthContext.Provider value={{user, loading, checkAuth, logout}}>
        {children}
    </AuthContext.Provider>
)

}
 
export {AuthContext, AuthProvider};