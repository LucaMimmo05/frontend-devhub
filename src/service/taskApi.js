import axios from "axios";
import { API_BASE_URL } from "./config";

export const getAllTasks = async token => {
    return axios
        .get(`${API_BASE_URL}/task`, {
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

export const getTasksNotCompleted = async token => {
    return axios
        .get(`${API_BASE_URL}/task/not-completed`, {
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

export const getAllCompletedTasks = async token => {
    return axios
        .get(`${API_BASE_URL}/task/completed`, {
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

export const createTask = async (taskData, token) => {
    return axios
        .post(`${API_BASE_URL}/task`, taskData, {
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

export const completeTask = async (id, token) => {
    return axios
        .put(`${API_BASE_URL}/task/${id}/complete`, null, {
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

export const deleteTask = async (id, token) => {
    return axios
        .delete(`${API_BASE_URL}/task/${id}`, {
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

// Alias per compatibilità con il codice esistente
export const getTasks = getAllTasks;
