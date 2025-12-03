import axios from "axios";
import { API_BASE_URL } from "./config";

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
    });

    return response;
};

export const registerUser = async (name, surname, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        surname,
        email,
        password,
    });

    return response;
};

export const verifyToken = async token => {
    const response = await axios.post(`${API_BASE_URL}/auth/verify`, {
        token,
    });

    return response;
};

export const refreshToken = async refreshTokenValue => {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: refreshTokenValue,
    });

    return response;
};

export const getGithubToken = async accessToken => {
    const response = await axios.get("http://localhost:8080/github", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response;
};
