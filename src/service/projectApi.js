import axios from "axios";
import { API_BASE_URL } from "./config";

/**
 * Ottiene tutti i progetti
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Lista di tutti i progetti
 */
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

/**
 * Ottiene un progetto per ID
 * @param {number} id - ID del progetto
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Dati del progetto
 */
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

/**
 * Crea un nuovo progetto
 * @param {Object} projectData - Dati del progetto da creare
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Progetto creato
 */
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

/**
 * Aggiorna un progetto esistente
 * @param {number} id - ID del progetto da aggiornare
 * @param {Object} projectData - Dati aggiornati del progetto
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Progetto aggiornato
 */
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

/**
 * Elimina un progetto
 * @param {number} id - ID del progetto da eliminare
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Risposta della richiesta
 */
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
