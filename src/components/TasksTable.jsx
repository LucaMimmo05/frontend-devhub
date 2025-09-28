import { completeTask } from "../service/api";
import "../styles/taskstable.css";
import { getFormattedDate } from "../utility/dateformatter";
import { useState } from "react";
import { useEffect } from "react";

export default function TasksTable({ tasks }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (tasks) setData(tasks);
    }, [tasks]);

    const onTaskComplete = async taskId => {
        const res = await completeTask(taskId, localStorage.getItem("accessToken"));

        if (res && res.id) {
            const filtered = data.filter(t => t.id !== taskId);

            setData(filtered);
        }
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
                    {data.map(task => (
                        <tr key={task.id}>
                            <td className="actions">
                                <div className="checkbox-cont">
                                    {" "}
                                    <input
                                        type="checkbox"
                                        name=""
                                        className="task-checkbox"
                                        id=""
                                        onClick={onTaskComplete.bind(this, task.id)}
                                    />
                                </div>{" "}
                            </td>
                            <td>
                                <span className="task-title">{task.title}</span>
                            </td>
                            <td>
                                <p className="task-description">{task.description}</p>
                            </td>
                            <td>
                                <span className={`status ${task.status?.toLowerCase()}`}>{task.status}</span>
                            </td>
                            <td>
                                <span className={`priority ${task.priority?.toLowerCase()}`}>
                                    {task.priority || "N/A"}
                                </span>
                            </td>
                            <td>{(task.dueDate && getFormattedDate(task.dueDate)) || "-"}</td>
                        </tr>
                    ))}
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
