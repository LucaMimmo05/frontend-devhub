import axios from "axios";
import { API_BASE_URL } from "./config";

export const updateUserSettings = async (token, settings) => {
    return axios
        .put(`${API_BASE_URL}/user`, settings, {
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

export const deleteUserAccount = async token => {
    return axios
        .delete(`${API_BASE_URL}/user`, {
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
