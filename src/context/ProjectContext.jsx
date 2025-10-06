import { createContext, useContext, useState, useEffect } from "react";
import { getAllProjects } from "../service/api";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState();
    const { user, accessToken } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = accessToken || localStorage.getItem("accessToken");

                if (token && user) {
                    const allProjects = await getAllProjects(token);

                    setProjects(allProjects);
                }
            } catch (err) {
                console.error("Errore nel caricamento dei progetti:", err);
            }
        };

        fetchProjects();
    }, [user, accessToken]);

    return (
        <ProjectContext.Provider value={{ projects, setProjects, currentProject, setCurrentProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    return useContext(ProjectContext);
};
