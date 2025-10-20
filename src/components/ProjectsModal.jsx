import { createProject, updateProject } from "../service/api";
import "../styles/projectmodal.css";
import ModalInputField from "./ModalInputField";
import TagsInput from "./TagsInput";
import { useState } from "react";
import { useProject } from "../context/ProjectContext";

const ProjectsModal = ({ title, onClose, data }) => {
    const { setCurrentProject, setProjects } = useProject();
    const [inputsValues, setInputsValues] = useState({
        name: data?.name || "",
        description: data?.description || "",
        progress: parseInt(data?.progress, 10) || 0,
        status: data?.status || "PENDING",
        technologies: data?.technologies || [],
        notes: data?.notes || "",
        folderColor: data?.folderColor || "BLUE",
    });

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        try {
            let project;

            if (data?.id) {
                project = await updateProject(data.id, inputsValues, token);
                setProjects(prev => prev.map(p => (p.id === project.id ? project : p)));
            } else {
                project = await createProject(inputsValues, token);
                setProjects(prev => [...prev, project]);
            }

            setCurrentProject(project);

            onClose();
        } catch (err) {
            console.error("Error saving project:", err);
        }
    };

    return (
        <div className="blur-bg">
            <div className="box project-modal centered">
                <h2>{title}</h2>
                <form className="project-modal-content" onSubmit={handleSubmit}>
                    <div className="project-modal-inputs">
                        <div className="project-modal-left">
                            <div className="project-modal-input">
                                <span>Name</span>
                                <ModalInputField
                                    value={inputsValues.name}
                                    name="name"
                                    type="text"
                                    placeholder="Es. Rossi"
                                    onChange={e => setInputsValues({ ...inputsValues, name: e.target.value })}
                                />
                            </div>
                            <div className="project-modal-input">
                                <span>Description</span>
                                <textarea
                                    value={inputsValues.description}
                                    name="description"
                                    className="notes-input"
                                    onChange={e => setInputsValues({ ...inputsValues, description: e.target.value })}
                                />
                            </div>
                            <div className="project-modal-input">
                                <span>Progress</span>
                                <ModalInputField
                                    value={inputsValues.progress}
                                    name="progress"
                                    type="range"
                                    placeholder="Es. 50"
                                    onChange={e =>
                                        setInputsValues({ ...inputsValues, progress: parseInt(e.target.value, 10) })
                                    }
                                />
                            </div>
                            <div className="project-modal-status">
                                <span>Status</span>
                                <select
                                    value={inputsValues.status}
                                    name="status"
                                    className="project-modal-select"
                                    onChange={e => setInputsValues({ ...inputsValues, status: e.target.value })}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                        </div>
                        <div className="project-modal-right">
                            <div className="project-modal-input">
                                <span>Technologies</span>
                                <TagsInput
                                    value={inputsValues.technologies}
                                    name="technologies"
                                    onChange={newTags => setInputsValues({ ...inputsValues, technologies: newTags })}
                                />
                            </div>
                            <div className="project-modal-input project-notes">
                                <span>Notes</span>
                                <textarea
                                    value={inputsValues.notes}
                                    name="notes"
                                    className="notes-input"
                                    onChange={e => setInputsValues({ ...inputsValues, notes: e.target.value })}
                                />
                            </div>
                            <div className="project-modal-status">
                                <span>Folder color</span>
                                <select
                                    value={inputsValues.folderColor}
                                    className="project-modal-select"
                                    name="folder-color"
                                    onChange={e => setInputsValues({ ...inputsValues, folderColor: e.target.value })}
                                >
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
                        <button className="button-cancel" type="button" onClick={onClose}>
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
