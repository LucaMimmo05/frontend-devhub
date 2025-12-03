import axios from "axios";
import { GITHUB_BASE_URL } from "./config";
import { withCache } from "./githubCache";

export const getRepos = async (sort, perPage, userId = "default") => {
    return withCache("repos", userId, { sort, perPage }, async () => {
        return axios
            .get(`${GITHUB_BASE_URL}/repos?sort=${sort}&per_page=${perPage}`)
            .then(response => response.data)
            .catch(error => {
                console.error("Errore nella richiesta:", error);
                throw error;
            });
    });
};

export const getGithubUserInfo = async token => {
    // Estrai userId dal token o usa un hash
    const userId = token ? token.substring(0, 10) : "default";

    return withCache("userInfo", userId, {}, async () => {
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
    });
};

export const getRecentActivities = async (token, per_page) => {
    const userId = token ? token.substring(0, 10) : "default";

    return withCache("activities", userId, { per_page }, async () => {
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
    });
};
