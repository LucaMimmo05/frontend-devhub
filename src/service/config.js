import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";
export const GITHUB_BASE_URL = "http://localhost:8080/github";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

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

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error("Errore nella richiesta:", error);

        return Promise.reject(error);
    }
);
