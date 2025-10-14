import axios from "axios";
import { API_BASE_URL } from "./config";

export const getAllProjects = async token => {
    return axios
        .get(`${API_BASE_URL}/project`, {
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

export const getProjectById = async (id, token) => {
    return axios
        .get(`${API_BASE_URL}/project/${id}`, {
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

export const createProject = async (projectData, token) => {
    return axios
        .post(`${API_BASE_URL}/project`, projectData, {
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

export const updateProject = async (id, projectData, token) => {
    return axios
        .put(`${API_BASE_URL}/project/${id}`, projectData, {
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

export const deleteProject = async (id, token) => {
    return axios
        .delete(`${API_BASE_URL}/project/${id}`, {
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
