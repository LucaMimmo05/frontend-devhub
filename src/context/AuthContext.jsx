import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Aggiungiamo lo stato per i dati utente

    // Funzione per capitalizzare la prima lettera di una stringa
    const capitalizeFirstLetter = useCallback(str => {
        if (!str) return "";

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }, []);

    // Funzione per estrarre i dati utente dal token
    const getUserDataFromToken = useCallback(
        token => {
            if (!token) return null;

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

                return {
                    id: payload.sub,
                    email: payload.email,
                    name: capitalizeFirstLetter(payload.name),
                    surname: capitalizeFirstLetter(payload.surname),
                    role: payload.groups?.find(g => g !== "access-token") || "USER",
                };
            } catch (error) {
                console.error("Error parsing user data from token:", error);

                return null;
            }
        },
        [capitalizeFirstLetter]
    );
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
            await axios.post("http://localhost:8080/api/auth/verify", {
                token: token, // access token
            });

            return true;
        } catch (error) {
            console.error("Token verification failed:", error);

            return false;
        }
    };

    // Refresh access token con body JSON
    const refreshAccessTokenInternal = async refreshTokenValue => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/refresh", {
                refreshToken: refreshTokenValue, // 👈 anche qui
            });

            const newAccessToken = response.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            return newAccessToken;
        } catch (error) {
            console.error("Refresh token failed:", error);
            logout();

            return null;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const access = localStorage.getItem("accessToken");
            const refresh = localStorage.getItem("refreshToken");
            const storedUserData = localStorage.getItem("userData");

            if (access && refresh) {
                // Carica i dati utente dal localStorage se disponibili
                if (storedUserData) {
                    try {
                        const userData = JSON.parse(storedUserData);

                        setUser(userData);
                    } catch (error) {
                        console.error("Error parsing stored user data:", error);
                    }
                }

                if (!storedUserData) {
                    const userData = getUserDataFromToken(access);

                    if (userData) {
                        localStorage.setItem("userData", JSON.stringify(userData));
                        setUser(userData);
                    }
                }

                if (isTokenExpired(access)) {
                    console.log("Access token expired, trying to refresh...");

                    const newToken = await refreshAccessTokenInternal(refresh);

                    if (newToken) {
                        const newUserData = getUserDataFromToken(newToken);

                        if (newUserData) {
                            localStorage.setItem("userData", JSON.stringify(newUserData));
                            setUser(newUserData);
                        }
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
                            const newUserData = getUserDataFromToken(newToken);

                            if (newUserData) {
                                localStorage.setItem("userData", JSON.stringify(newUserData));
                                setUser(newUserData);
                            }
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
    }, [getUserDataFromToken]);

    const login = (access, refresh) => {
        // Salva i token
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        // Estrae e salva i dati utente dal token
        const userData = getUserDataFromToken(access);

        if (userData) {
            localStorage.setItem("userData", JSON.stringify(userData));
            setUser(userData);
        }

        setAccessToken(access);
        setRefreshToken(refresh);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    const refreshAccessToken = useCallback(async () => {
        if (!refreshToken) {
            logout();

            return null;
        }

        const newToken = await refreshAccessTokenInternal(refreshToken);

        if (newToken) {
            const newUserData = getUserDataFromToken(newToken);

            if (newUserData) {
                localStorage.setItem("userData", JSON.stringify(newUserData));
                setUser(newUserData);
            }
            setAccessToken(newToken);

            return newToken;
        } else {
            logout();

            return null;
        }
    }, [refreshToken, getUserDataFromToken]);

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
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
