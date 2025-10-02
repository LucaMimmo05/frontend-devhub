import "../styles/projectdetails.css";
import { renderColor } from "../utility/rendercolor";
import { getDarkerFromLight } from "../utility/darkencolor";
import AddButton from "../components/AddButton";
import { getFormattedDate, getFormattedTime } from "../utility/dateformatter";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ProjectsModal from "../components/ProjectsModal";
import { useEffect } from "react";
import { getProjectById } from "../service/api";
import { useProject } from "../context/ProjectContext";

const ProjectDetail = () => {
    const { currentProject, setCurrentProject } = useProject();
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);

    const idParam = Number(id);

    useEffect(() => {
        const fetchCurrentProject = async () => {
            try {
                const project = await getProjectById(idParam, localStorage.getItem("accessToken"));

                setCurrentProject(project);
            } catch (error) {
                console.error("Errore nel recupero dei progetti:", error);
            }
        };

        fetchCurrentProject();
    }, [idParam]);

    // Skeleton loader
    if (!currentProject) return <div className="loading">Loading project...</div>;

    if (currentProject.id !== idParam) return <div className="not-found">Project not found</div>;

    const progress = Math.min(100, Math.max(0, currentProject.progress || 0));

    const handleEdit = () => {
        setOpenModal(true);
    };

    return (
        <section className="project-details">
            <div className="project-details-top">
                <div className="title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
                        <path
                            d="
                                M41.6667 12.9999
                                H22.9167
                                L18.7501 8.83325
                                H8.33341
                                C6.04175 8.83325 4.16675 10.7083 4.16675 12.9999
                                V21.3333
                                H45.8334
                                V17.1666
                                C45.8334 14.8749 43.9584 12.9999 41.6667 12.9999
                                Z
                            "
                            fill={getDarkerFromLight(renderColor(currentProject.folderColor), 0.3)}
                        />
                        <path
                            d={`
                                M41.6667 13H8.33341C6.04175 13 4.16675 14.875 4.16675 17.1667V38
                                C4.16675 40.2917 6.04175 42.1667 8.33341 42.1667H41.6667
                                C43.9584 42.1667 45.8334 40.2917 45.8334 38V17.1667
                                C45.8334 14.875 43.9584 13 41.6667 13Z
                            `}
                            fill={renderColor(currentProject.folderColor)}
                        />
                    </svg>
                    <h1>{currentProject.name || "Unnamed Project"}</h1>
                </div>
                <AddButton type={"edit"} onClick={handleEdit} />
            </div>

            <div className="project-details-content">
                <div className="project-details-container">
                    <div className="project-details-three box">
                        <h2>Description</h2>
                        <p>{currentProject.description || "No description available."}</p>
                    </div>

                    <div className="project-details-three box">
                        <h2>Technologies</h2>
                        <div className="technology">
                            {currentProject.technologies?.length > 0 ? (
                                currentProject.technologies.map(tech => <p key={tech}>{tech}</p>)
                            ) : (
                                <p>No technologies listed.</p>
                            )}
                        </div>
                    </div>

                    <div className="project-details-two box">
                        <h2>Created At</h2>
                        <p>
                            {currentProject.createdAt
                                ? `${getFormattedDate(currentProject.createdAt)}
                                ${getFormattedTime(currentProject.createdAt)}`
                                : "Unknown"}
                        </p>
                    </div>

                    <div className="project-details-two box">
                        <h2>Updated At</h2>
                        <p>
                            {currentProject.updatedAt
                                ? `${getFormattedDate(currentProject.updatedAt)}
                                ${getFormattedTime(currentProject.updatedAt)}`
                                : "Unknown"}
                        </p>
                    </div>
                </div>
                {openModal && (
                    <ProjectsModal data={currentProject} title={"Edit Project"} onClose={() => setOpenModal(false)} />
                )}

                <div className="project-details-container">
                    <div className="project-details-two progress box">
                        <h2>Progress</h2>
                        <div className="progress-bar-cont">
                            <div className="progress-bar">
                                <div className="percentage" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p>{progress}%</p>
                        </div>
                    </div>

                    <div className="project-details-all box">
                        <h2>Notes</h2>
                        <p>{currentProject.notes || "No notes available."}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
