import { completeTask, updateTask } from "../service/api";
import "../styles/taskstable.css";
import { getFormattedDate } from "../utility/dateformatter";
import { useState } from "react";
import { useEffect } from "react";
import { deleteTask } from "../service/api";
import { useToast } from "../context/ToastContext";

export default function TasksTable({ tasks, isArchive = false }) {
    const [data, setData] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editValues, setEditValues] = useState({});
    const { showSuccess, showError } = useToast();

    useEffect(() => {
        if (tasks) setData(tasks);
    }, [tasks]);

    const onTaskComplete = async taskId => {
        try {
            const res = await completeTask(taskId, localStorage.getItem("accessToken"));

            if (res && res.id === taskId && !isArchive) {
                const filtered = data.filter(t => t.id !== taskId);

                setData(filtered);
                showSuccess("Task completed successfully");
            }
        } catch (error) {
            console.error("Failed to complete task:", error);
            showError("Failed to complete task");
        }
    };

    const onDelete = async id => {
        try {
            await deleteTask(id, localStorage.getItem("accessToken"));

            setData(prevData => prevData.filter(t => t.id !== id));
            showSuccess("Task deleted successfully");
        } catch (err) {
            console.error("Failed to delete task:", err);
            showError("Failed to delete task");
        }
    };

    const startEditing = task => {
        setEditingTask(task.id);
        setEditValues({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        });
    };

    const cancelEditing = () => {
        setEditingTask(null);
        setEditValues({});
    };

    const saveTask = async taskId => {
        try {
            const updatedTask = await updateTask(taskId, editValues, localStorage.getItem("accessToken"));

            setData(prevData => prevData.map(t => (t.id === taskId ? { ...t, ...updatedTask } : t)));

            setEditingTask(null);
            setEditValues({});
            showSuccess("Task updated successfully");
        } catch (err) {
            console.error("Failed to update task:", err);
            showError("Failed to update task");
        }
    };

    const handleInputChange = (field, value) => {
        setEditValues(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="table-container box">
            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(task => {
                        const isEditing = editingTask === task.id;

                        return (
                            <tr key={task.id} className={isEditing ? "editing" : ""}>
                                <td className="actions">
                                    <div className="action-buttons">
                                        {isEditing ? (
                                            <>
                                                <button className="save-button" onClick={() => saveTask(task.id)}>
                                                    ✓
                                                </button>
                                                <button className="cancel-button" onClick={cancelEditing}>
                                                    ✕
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {!isArchive ? (
                                                    <>
                                                        <button
                                                            className="edit-button"
                                                            onClick={() => startEditing(task)}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="20"
                                                                height="20"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M15.2141 5.98239L16.6158 4.58063C17.39 
                                                                    3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 
                                                                    5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 
                                                                    8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 
                                                                    15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 
                                                                    17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 
                                                                    19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 
                                                                    18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 
                                                                    5.98239L18.0176 8.78591"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <input
                                                            type="checkbox"
                                                            className="task-checkbox"
                                                            onClick={onTaskComplete.bind(this, task.id)}
                                                        />
                                                    </>
                                                ) : (
                                                    <button className="delete-button" onClick={() => onDelete(task.id)}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="20"
                                                            height="20"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M19.5 5.5L18.8803 15.5251C18.7219 
                                                                18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 
                                                                20.7431 17.2747 21.1273 16.8007 21.416C15.8421 
                                                                22 14.559 22 11.9927 22C9.42312 22 8.1383 22 
                                                                7.17905 21.4149C6.7048 21.1257 6.296 20.7408 
                                                                5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 
                                                                5.10461 15.5152L4.5 5.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 
                                                                3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 
                                                                2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 
                                                                13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 
                                                                2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 
                                                                2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 
                                                                4.17126L8.05273 5.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="inline-input"
                                            value={editValues.title}
                                            onChange={e => handleInputChange("title", e.target.value)}
                                        />
                                    ) : (
                                        <span className="task-title">{task.title}</span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="inline-input"
                                            value={editValues.description}
                                            onChange={e => handleInputChange("description", e.target.value)}
                                        />
                                    ) : (
                                        <p className="task-description">{task.description}</p>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <select
                                            className="inline-select"
                                            value={editValues.status}
                                            onChange={e => handleInputChange("status", e.target.value)}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                        </select>
                                    ) : (
                                        <span className={`status ${task.status?.toLowerCase()}`}>{task.status}</span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <select
                                            className="inline-select"
                                            value={editValues.priority}
                                            onChange={e => handleInputChange("priority", e.target.value)}
                                        >
                                            <option value="LOW">LOW</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="HIGH">HIGH</option>
                                        </select>
                                    ) : (
                                        <span className={`priority ${task.priority?.toLowerCase()}`}>
                                            {task.priority || "N/A"}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            className="inline-input"
                                            value={editValues.dueDate}
                                            onChange={e => handleInputChange("dueDate", e.target.value)}
                                        />
                                    ) : (
                                        <span>{(task.dueDate && getFormattedDate(task.dueDate)) || "-"}</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan="7" className="no-tasks">
                                No tasks found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
