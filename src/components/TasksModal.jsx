import { createTask } from "../service/api";
import "../styles/tasksmodal.css";
import ModalInputDateField from "./ModalInputDateField";
import ModalInputField from "./ModalInputField";
import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";

const TasksModal = ({ onClose, title, data }) => {
    const { setTasks } = useTask();
    const { showSuccess, showError } = useToast();
    const [loading, setLoading] = useState(false);
    const [inputsValues, setInputsValues] = useState({
        title: data?.title || "",
        description: data?.description || "",
        status: data?.status || "PENDING",
        dueDate: data?.dueDate || null,
        priority: data?.priority || "LOW",
    });
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        console.log(inputsValues);

        try {
            if (data?.id) {
                // Update task
            } else {
                await createTask(inputsValues, localStorage.getItem("accessToken"));
                setTasks(prev => [...prev, inputsValues]);
                showSuccess("Task created successfully");
            }
            onClose();
        } catch (error) {
            console.error("Error saving task:", error);
            showError("Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="blur-bg">
            <div className="tasks-modal box">
                <h1>{title}</h1>
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-inputs">
                        <div className="modal-values">
                            <div className="project-modal-input">
                                <span>Title</span>
                                <ModalInputField
                                    label="Title"
                                    name="title"
                                    type="text"
                                    placeholder="Es. Design Homepage"
                                    required
                                    onChange={e => setInputsValues({ ...inputsValues, title: e.target.value })}
                                />
                            </div>
                            <div className="project-modal-input">
                                <span>Description</span>
                                <textarea
                                    name="description"
                                    className="notes-input"
                                    type="text"
                                    onChange={e => setInputsValues({ ...inputsValues, description: e.target.value })}
                                />
                            </div>
                            <div className="project-modal-status">
                                <span>Status</span>
                                <select
                                    name={"status"}
                                    className="project-modal-select"
                                    id=""
                                    value={inputsValues.status}
                                    onChange={e => setInputsValues({ ...inputsValues, status: e.target.value })}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                            <div className="project-modal-input">
                                <span>Due Date</span>
                                <ModalInputDateField
                                    value={inputsValues.dueDate}
                                    onChange={e => setInputsValues({ ...inputsValues, dueDate: e.target.value })}
                                    name="dueDate"
                                />
                            </div>
                            <div className="project-modal-status">
                                <span>Priority</span>
                                <select
                                    name={"priority"}
                                    className="project-modal-select"
                                    id=""
                                    value={inputsValues.priority}
                                    onChange={e => setInputsValues({ ...inputsValues, priority: e.target.value })}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="project-modal-buttons">
                            <button className="button-cancel" onClick={onClose} type="button">
                                Cancel
                            </button>
                            <button className="button-save" type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TasksModal;
