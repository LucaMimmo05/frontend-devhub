import { completeTask } from "../service/api";
import "../styles/taskstable.css";
import { getFormattedDate } from "../utility/dateformatter";
import { useState } from "react";
import { useEffect } from "react";
import { deleteTask } from "../service/api";

export default function TasksTable({ tasks, isArchive = false }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (tasks) setData(tasks);
    }, [tasks]);

    const onTaskComplete = async taskId => {
        const res = await completeTask(taskId, localStorage.getItem("accessToken"));

        if (res && res.id === taskId && !isArchive) {
            const filtered = data.filter(t => t.id !== taskId);

            setData(filtered);
        }
    };

    const onDelete = async id => {
        try {
            await deleteTask(id, localStorage.getItem("accessToken"));

            setData(prevData => prevData.filter(t => t.id !== id));
        } catch (err) {
            console.error("Failed to delete task:", err);
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
                                    {!isArchive ? (
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="task-checkbox"
                                            id=""
                                            onClick={onTaskComplete.bind(this, task.id)}
                                        />
                                    ) : (
                                        <button className="delete-button" onClick={() => onDelete(task.id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                color="#ffffff"
                                                fill="none"
                                            >
                                                <path
                                                    d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671
                                                    18.0008 20.2879C17.6833 20.7431 17.2747
                                                    21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22
                                                    8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868
                                                    20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                                    stroke="#ffffff"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                                <path
                                                    d="M9 11.7349H15"
                                                    stroke="#ffffff"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                                <path
                                                    d="M10.5 15.6543H13.5"
                                                    stroke="#ffffff"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                                <path
                                                    d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626
                                                    14.6926 2.68852 14.3015
                                                    2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937
                                                    2 13.0739 2 12.0343
                                                    2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479
                                                    2.3459 9.7171
                                                    2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5"
                                                    stroke="#ffffff"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                            </svg>
                                        </button>
                                    )}
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
