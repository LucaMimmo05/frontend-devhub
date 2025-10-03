import axios from "axios";
import { API_BASE_URL } from "./config";

/**
 * Ottiene un comando casuale
 * @param {number} id - ID dell'utente o del comando
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Comando casuale
 */
export const getCommand = async (id, token) => {
    return axios
        .get(`${API_BASE_URL}/command/random/${id}`, {
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
 * Ottiene tutti i comandi
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Lista di tutti i comandi
 */
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

/**
 * Ottiene un comando per ID
 * @param {number} id - ID del comando
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Dati del comando
 */
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

/**
 * Crea un nuovo comando
 * @param {Object} commandData - Dati del comando da creare
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Comando creato
 */
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

/**
 * Aggiorna un comando esistente
 * @param {number} id - ID del comando da aggiornare
 * @param {Object} commandData - Dati aggiornati del comando
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Comando aggiornato
 */
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

/**
 * Elimina un comando
 * @param {number} id - ID del comando da eliminare
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Risposta della richiesta
 */
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
