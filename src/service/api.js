import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getTasks = async token => {
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

export const getCommand = async (id, token) => {
    return axios
        .get(`${API_BASE_URL}/command/random/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta: ", error);
        });
};

export const getRepos = async id => {
    return axios
        .get(`http://localhost:8080/github/repos/${id}?sort=updated&per_page=10`)
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta: ", error);
        });
};

export const getAllProjects = async token => {
    return axios
        .get(`${API_BASE_URL}/project`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.data)
        .catch(error => {
            console.error("Errore nella richiesta: ", error);
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
            console.error("Errore nella richiesta: ", error);
        });
};
