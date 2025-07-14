import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const isTokenExpired = token => {
        if (!token) return true;

        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split("")
                    .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
            const payload = JSON.parse(jsonPayload);
            const currentTime = Date.now() / 1000;

            return payload.exp < currentTime;
        } catch (error) {
            console.error("Error parsing token:", error);

            return true;
        }
    };

    const verifyTokenWithServer = async token => {
        try {
            await axios.get("http://localhost:8080/api/auth/verify", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return true;
        } catch (error) {
            console.error("Token verification failed:", error);

            return false;
        }
    };

    const refreshAccessTokenInternal = async refreshTokenValue => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/refresh", {
                refreshToken: refreshTokenValue,
            });

            const newAccessToken = response.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            return newAccessToken;
        } catch (error) {
            console.error("Refresh token failed:", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const access = localStorage.getItem("accessToken");
            const refresh = localStorage.getItem("refreshToken");

            if (access && refresh) {
                if (isTokenExpired(access)) {
                    console.log("Access token expired, trying to refresh...");

                    const newToken = await refreshAccessTokenInternal(refresh);

                    if (newToken) {
                        setAccessToken(newToken);
                        setRefreshToken(refresh);
                    } else {
                        logout();
                    }
                } else {
                    const isValid = await verifyTokenWithServer(access);

                    if (isValid) {
                        setAccessToken(access);
                        setRefreshToken(refresh);
                    } else {
                        const newToken = await refreshAccessTokenInternal(refresh);

                        if (newToken) {
                            setAccessToken(newToken);
                            setRefreshToken(refresh);
                        } else {
                            logout();
                        }
                    }
                }
            }

            setLoading(false);
        };

        initializeAuth();
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

    // Funzione pubblica per il refresh del token
    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) {
            logout();

            return null;
        }

        const newToken = await refreshAccessTokenInternal(refreshToken);

        if (newToken) {
            setAccessToken(newToken);

            return newToken;
        } else {
            logout();

            return null;
        }
    }, [refreshToken]);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                if (accessToken && !isTokenExpired(accessToken)) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            },
            error => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    const newToken = await refreshAccessToken();

                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;

                        return axios(originalRequest);
                    } else {
                        logout();

                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, refreshToken, refreshAccessToken]);

    const isAuthenticated = !!accessToken && !isTokenExpired(accessToken);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
