import axios from "axios";
import { GITHUB_BASE_URL } from "./config";

export const getRepos = async (sort, perPage) => {
    return axios
        .get(`${GITHUB_BASE_URL}/repos?sort=${sort}&per_page=${perPage}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            throw error;
        });
};

export const getGithubUserInfo = async token => {
    return axios
        .get(`${GITHUB_BASE_URL}/user`, {
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

export const getRecentActivities = async (token, per_page) => {
    return axios
        .get(`${GITHUB_BASE_URL}/activities?per_page=${per_page}`, {
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
