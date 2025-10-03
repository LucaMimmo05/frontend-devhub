import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";
export const GITHUB_BASE_URL = "http://localhost:8080/github";

// Crea un'istanza axios con configurazione base
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor per aggiungere automaticamente il token se disponibile
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor per gestire errori comuni
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error("Errore nella richiesta:", error);

        return Promise.reject(error);
    }
);
