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
            console.error("Errore nella richiesta: ", error);
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
            console.error("Errore nella richiesta: ", error);
            throw error;
        });
};

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
