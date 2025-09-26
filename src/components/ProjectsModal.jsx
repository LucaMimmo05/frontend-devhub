/* global FormData */
import { createProject } from "../service/api";
import "../styles/projectmodal.css";
import ProjectInputField from "./ProjectInputField";
import TagsInput from "./TagsInput";
import { useState } from "react";

const ProjectsModal = ({ title, onClose }) => {
    const [tags, setTags] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const projectData = {
            name: formData.get("name"),
            description: formData.get("description"),
            progress: formData.get("progress"),
            status: formData.get("status"),
            technologies: tags,
            notes: formData.get("notes"),
            folderColor: formData.get("folder-color"),
        };

        await createProject(projectData, localStorage.getItem("accessToken"));
        onClose();
    };

    return (
        <div className="blur-bg">
            <div className="box project-modal">
                <h2>{title}</h2>
                <form className="project-modal-content" onSubmit={handleSubmit}>
                    <div className="project-modal-inputs">
                        <div className="project-modal-left">
                            <div className="project-modal-input">
                                <span>Name</span>
                                <ProjectInputField name={"name"} type={"text"} placeholder={"Es. Rossi"} />
                            </div>
                            <div className="project-modal-input">
                                <span>Description</span>
                                <textarea name={"description"} className="desc-input" type="text" />
                            </div>
                            <div className="project-modal-input">
                                <span>Progress</span>
                                <ProjectInputField name={"progress"} type={"range"} placeholder={"Es. 50"} />
                            </div>
                            <div className="project-modal-status">
                                <span>Status</span>
                                <select name={"status"} className="project-modal-select" id="">
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                        </div>
                        <div className="project-modal-right">
                            <div className="project-modal-input">
                                <span>Technologies</span>
                                <TagsInput name={"technologies"} onChange={setTags} />
                            </div>
                            <div className="project-modal-input project-notes">
                                <span>Notes</span>
                                <textarea name={"notes"} className="notes-input" type="text" />
                            </div>
                            <div className="project-modal-status">
                                <span>Folder color</span>
                                <select className="project-modal-select" name="folder-color" id="folder-color">
                                    <option value="RED">RED</option>
                                    <option value="GREEN">GREEN</option>
                                    <option value="BLUE">BLUE</option>
                                    <option value="YELLOW">YELLOW</option>
                                    <option value="ORANGE">ORANGE</option>
                                    <option value="PURPLE">PURPLE</option>
                                    <option value="PINK">PINK</option>
                                    <option value="BROWN">BROWN</option>
                                    <option value="GREY">GRAY</option>
                                    <option value="CYAN">CYAN</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="project-modal-buttons">
                        <button className="button-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="button-save" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectsModal;
