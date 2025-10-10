import axios from "axios";
import { GITHUB_BASE_URL } from "./config";

/**
 * Ottiene i repository GitHub dell'utente
 * @param {number} id - ID dell'utente
 * @returns {Promise} Lista dei repository
 */
export const getRepos = async (id, sort, perPage) => {
    return axios
        .get(`${GITHUB_BASE_URL}/repos/${id}?sort=${sort}&per_page=${perPage}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

/**
 * Ottiene le informazioni dell'utente GitHub
 * @param {number} id - ID dell'utente
 * @param {string} token - Token di autenticazione
 * @returns {Promise} Informazioni utente GitHub
 */
export const getGithubUserInfo = async (id, token) => {
    return axios
        .get(`${GITHUB_BASE_URL}/user/${id}`, {
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

export const getRecentActivities = async (id, token, per_page) => {
    return axios
        .get(`${GITHUB_BASE_URL}/activities/${id}?per_page=${per_page}`, {
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
