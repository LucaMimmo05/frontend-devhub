import axios from "axios";
import { API_BASE_URL } from "./config";

/**
 * Ottiene tutte le task
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Lista di tutte le task
 */
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

/**
 * Ottiene le task non completate
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Lista delle task non completate
 */
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

/**
 * Ottiene tutte le task completate
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Lista delle task completate
 */
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

/**
 * Crea una nuova task
 * @param {Object} taskData - Dati della task da creare
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Task creata
 */
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

/**
 * Segna una task come completata
 * @param {number} id - ID della task
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Task aggiornata
 */
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

/**
 * Elimina una task
 * @param {number} id - ID della task da eliminare
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Risposta della richiesta
 */
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
