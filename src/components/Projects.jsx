import { useState } from "react";
import "../styles/projects.css";
import Project from "./Project";

import axios from "axios";
import { useEffect } from "react";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const getProjects = async () => {
        axios
            .get("http://localhost:8080/api/project", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then(response => {
                console.log(response.data);
                setProjects(response.data);
            })
            .catch(error => {
                console.log("Error occured:" + error);
            });
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="projects">
            <div className="projects-top">
                <div className="title">
                    <h1>Projects</h1>
                    <p>Your active and archived projects in one place.</p>
                </div>
                <button>+</button>
            </div>

            <div className="projects-content">
                {projects.map(project => (
                    <Project key={project.id} data={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
