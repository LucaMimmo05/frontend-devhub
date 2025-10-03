import axios from "axios";
import { GITHUB_BASE_URL } from "./config";

/**
 * Ottiene i repository GitHub dell'utente
 * @param {number} id - ID dell'utente
 * @returns {Promise} Lista dei repository
 */
export const getRepos = async id => {
    return axios
        .get(`${GITHUB_BASE_URL}/repos/${id}?sort=updated&per_page=10`)
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

/**
 * Ottiene un repository specifico
 * @param {number} id - ID dell'utente
 * @param {string} repoName - Nome del repository
 * @returns {Promise} Dati del repository
 */
export const getRepoByName = async (id, repoName) => {
    return axios
        .get(`${GITHUB_BASE_URL}/repos/${id}/${repoName}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

/**
 * Ottiene i commit di un repository
 * @param {number} id - ID dell'utente
 * @param {string} repoName - Nome del repository
 * @param {number} perPage - Numero di commit per pagina
 * @returns {Promise} Lista dei commit
 */
export const getRepoCommits = async (id, repoName, perPage = 10) => {
    return axios
        .get(`${GITHUB_BASE_URL}/repos/${id}/${repoName}/commits?per_page=${perPage}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

// Alias per compatibilità con il codice esistente
export const getGithubUsrInfo = getGithubUserInfo;
