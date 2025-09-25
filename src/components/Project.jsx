import "../styles/project.css";
import { getDarkerFromLight } from "../utility/darkencolor";
import { usePage } from "../context/PageContext";
import { useProject } from "../context/ProjectContext";

import { renderColor } from "../utility/rendercolor";

const Project = ({ data }) => {
    const { setCurrentProject } = useProject();
    const { setCurrentPage } = usePage();
    const renderStatus = () => {
        switch (data.status) {
            case "PENDING":
                return "Pending";
            case "IN_PROGRESS":
                return "In progress";

            case "DONE":
                return "Done";
        }
    };

    const handleClickButton = () => {
        setCurrentProject(data);
        setCurrentPage("Project Details");
    };

    return (
        <div className="box project">
            <div className="project-info">
                <div className="project-top">
                    <div className="project-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 50 51" fill="none">
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
                                fill={getDarkerFromLight(renderColor(data.folderColor), 0.3)}
                            />
                            <path
                                d={
                                    "M41.6667 13H8.33341C6.04175 13 4.16675 14.875 4.16675 17.1667V38C4.16675 40.2917" +
                                    "6.04175 42.1667 8.33341 42.1667H41.6667C43.9584 42.1667 45.8334 40.2917 " +
                                    "45.8334 38V17.1667C45.8334 14.875 43.9584 13 41.6667 13Z"
                                }
                                fill={renderColor(data.folderColor)}
                            />
                        </svg>
                        <h2>{data.name}</h2>
                    </div>
                    <div className="project-status">
                        <div className={`circle ${data.status}`}></div>
                        <p>{renderStatus()}</p>
                    </div>{" "}
                </div>
                <div className="project-desc">
                    <p>{data.description}</p>
                </div>
            </div>
            <div className="project-bottom">
                <button onClick={handleClickButton}>See Details</button>
            </div>
        </div>
    );
};

export default Project;
