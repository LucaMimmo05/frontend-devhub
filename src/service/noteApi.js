import axios from "axios";
import { API_BASE_URL } from "./config";

export const getNote = async token => {
    return axios
        .get(`${API_BASE_URL}/note`, {
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

export const createNote = async (token, note) => {
    return axios
        .post(`${API_BASE_URL}/note`, note, {
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

export const updateNote = async (token, noteId, noteData) => {
    return axios
        .put(`${API_BASE_URL}/note/${noteId}`, noteData, {
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
export const deleteNote = async (token, noteId) => {
    return axios
        .delete(`${API_BASE_URL}/note/${noteId}`, {
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
