import { useState } from "react";
import "../styles/projects.css";
import Project from "../components/Project";
import Button from "../components/Button";
import ProjectsModal from "../components/ProjectsModal";
import { useProject } from "../context/ProjectContext";

const Projects = () => {
    const { projects } = useProject();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleclose = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="projects">
            <div className="projects-top">
                <div className="title">
                    <h1>Projects</h1>
                    <p>Your active and archived projects in one place.</p>
                </div>
                <Button type={"add"} onClick={handleClick} />
            </div>

            {isModalOpen && <ProjectsModal onClose={handleclose} title={"Create Project"} />}

            <div className="projects-content">
                {projects && projects.map(project => <Project key={project.id} data={project} />)}
            </div>
        </section>
    );
};

export default Projects;
