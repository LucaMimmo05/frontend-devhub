/* eslint-disable max-len */
import { useState } from "react";
import "../styles/projects.css";
import Project from "../components/Project";
import Button from "../components/Button";
import ProjectsModal from "../components/ProjectsModal";
import { useProject } from "../context/ProjectContext";
import EmptyState from "../components/EmptyState";
import BurgerMenu from "../components/BurgerMenu";

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
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <BurgerMenu />
                        <h1>Projects</h1>
                    </div>
                    <p>Your active and archived projects in one place.</p>
                </div>
                <Button type={"add"} onClick={handleClick} />
            </div>

            {isModalOpen && <ProjectsModal onClose={handleclose} title={"Create Project"} />}

            <div className="projects-content">
                {projects && projects.length > 0 ? (
                    projects.map(project => <Project key={project.id} data={project} />)
                ) : (
                    <EmptyState
                        icon={
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 8V12L14.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        title="No projects yet"
                        message="Create your first project to start organizing your work."
                        actionButton={<Button type={"add"} onClick={handleClick} />}
                    />
                )}
            </div>
        </section>
    );
};

export default Projects;
