import axios from "axios";
import { API_BASE_URL } from "./config";

export const getCommand = async (id, token) => {
    return axios
        .get(`${API_BASE_URL}/command/${id}/random`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

export const getAllCommands = async token => {
    return axios
        .get(`${API_BASE_URL}/command`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

export const getCommandById = async (id, token) => {
    return axios
        .get(`${API_BASE_URL}/command/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

export const createCommand = async (commandData, token) => {
    return axios
        .post(`${API_BASE_URL}/command`, commandData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

export const updateCommand = async (id, commandData, token) => {
    return axios
        .put(`${API_BASE_URL}/command/${id}`, commandData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

export const deleteCommand = async (id, token) => {
    return axios
        .delete(`${API_BASE_URL}/command/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};
