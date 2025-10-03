import { createContext, useContext, useState, useEffect } from "react";
import { getAllProjects } from "../service/api";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (token) {
                    const allProjects = await getAllProjects(token);

                    setProjects(allProjects);
                }
            } catch (err) {
                console.error("Errore nel caricamento dei progetti:", err);
            }
        };

        fetchProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, setProjects, currentProject, setCurrentProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    return useContext(ProjectContext);
};
