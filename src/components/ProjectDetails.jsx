import "../styles/projectdetails.css";
import { useProject } from "../context/ProjectContext";
import { renderColor } from "../utility/rendercolor";
import { getDarkerFromLight } from "../utility/darkencolor";
import AddButton from "./AddButton";
import { getFormattedDate, getFormattedTime } from "../utility/dateformatter";
const ProjectDetail = () => {
    const { currentProject } = useProject();

    const technologies = currentProject.technologies
        ? currentProject.technologies.split(" ").map(tech => tech.trim())
        : [];

    return (
        <div className="project-details">
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
                            d={
                                "M41.6667 13H8.33341C6.04175 13 4.16675 14.875 4.16675 17.1667V38C4.16675 40.2917" +
                                "6.04175 42.1667 8.33341 42.1667H41.6667C43.9584 42.1667 45.8334 40.2917 " +
                                "45.8334 38V17.1667C45.8334 14.875 43.9584 13 41.6667 13Z"
                            }
                            fill={renderColor(currentProject.folderColor)}
                        />
                    </svg>
                    <h1>{currentProject.name}</h1>
                </div>
                <AddButton type={"edit"} />
            </div>
            <div className="project-details-content">
                <div className="project-details-container">
                    <div className="project-details-three box">
                        <h2>Description</h2>
                        <p>{currentProject.description}</p>
                    </div>
                    <div className="project-details-three box">
                        <h2>Technologies</h2>
                        <div className="technology">
                            {technologies.map((tech, index) => (
                                <p key={index}>{tech}</p>
                            ))}
                        </div>
                    </div>
                    <div className="project-details-two box">
                        <h2>Created At</h2>
                        <p>
                            {currentProject.createdAt && getFormattedDate(currentProject.createdAt)}{" "}
                            {currentProject.createdAt && getFormattedTime(currentProject.createdAt)}
                        </p>
                    </div>
                    <div className="project-details-two box">
                        <h2>Updated At</h2>
                        <p>
                            {currentProject.updatedAt && getFormattedDate(currentProject.updatedAt)}{" "}
                            {currentProject.updatedAt && getFormattedTime(currentProject.updatedAt)}
                        </p>
                    </div>
                </div>
                <div className="project-details-container">
                    <div className="project-details-two progress box">
                        <h2>Progress</h2>
                        <div className="progress-bar-cont">
                            <div className="progress-bar">
                                <div className="percentage" style={{ width: `${currentProject.progress}%` }}></div>
                            </div>
                            <p>{currentProject.progress}%</p>
                        </div>
                    </div>
                    <div className="project-details-all box">
                        <h2>Notes</h2>
                        <p>{currentProject.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
