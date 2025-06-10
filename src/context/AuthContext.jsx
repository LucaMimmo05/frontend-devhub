import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const access = localStorage.getItem("accessToken");
        const refresh = localStorage.getItem("refreshToken");

        if (access) {
            setAccessToken(access);
        }
        if (refresh) {
            setRefreshToken(refresh);
        }
        setLoading(false);
    }, []);

    const login = (access, refresh) => {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        setAccessToken(access);
        setRefreshToken(refresh);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
        setRefreshToken(null);
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/refresh", {
                refreshToken: refreshToken,
            });

            const newAccessToken = response.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);
            setAccessToken(newAccessToken);

            return newAccessToken;
        } catch (error) {
            console.error("Refresh token failed:", error);
            logout();

            return null;
        }
    };

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                isAuthenticated,
                login,
                logout,
                loading,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
