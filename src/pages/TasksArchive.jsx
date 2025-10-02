import { useEffect, useState } from "react";
import TasksTable from "../components/TasksTable";
import "../styles/tasksarchive.css";
import { getAllCompletedTasks } from "../service/api";

const TasksArchive = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            const tasks = await getAllCompletedTasks(localStorage.getItem("token"));

            setCompletedTasks(tasks);
        };

        fetchCompletedTasks();
    }, []);

    return (
        <div className="tasks-archive">
            <div className="title">
                <h1>Tasks Archive</h1>
                <p>Archived data will be retained for 30 days before permanent deletion. </p>
            </div>
            <TasksTable tasks={completedTasks} isArchive />
        </div>
    );
};

export default TasksArchive;
