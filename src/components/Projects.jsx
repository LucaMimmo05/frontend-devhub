import { useState } from "react";
import "../styles/projects.css";
import Project from "./Project";

import { useEffect } from "react";
import { getAllProjects } from "../service/api";
import AddButton from "./AddButton";
import ProjectsModal from "./ProjectsModal";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getAllProjects(localStorage.getItem("accessToken"));

                setProjects(res);
            } catch (error) {
                console.error("Errore nel recupero dei progetti:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleclose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="projects">
            <div className="projects-top">
                <div className="title">
                    <h1>Projects</h1>
                    <p>Your active and archived projects in one place.</p>
                </div>
                <AddButton type={"add"} onClick={handleClick} />
            </div>

            {isModalOpen && <ProjectsModal onClose={handleclose} title={"Create Project"} />}

            <div className="projects-content">
                {projects && projects.map(project => <Project key={project.id} data={project} />)}
            </div>
        </div>
    );
};

export default Projects;
