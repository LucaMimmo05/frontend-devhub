import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [currentProject, setCurrentProject] = useState();

    return (
        <ProjectContext.Provider value={{ currentProject: currentProject, setCurrentProject: setCurrentProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

const useProject = () => {
    return useContext(ProjectContext);
};

export { ProjectProvider, useProject };
