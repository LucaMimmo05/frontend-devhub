import { useEffect } from "react";
import AddButton from "../components/AddButton";
import TasksTable from "../components/TasksTable";
import "../styles/tasks.css";
import { getTasksNotCompleted } from "../service/api";
import { useState } from "react";

const Tasks = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = (await getTasksNotCompleted(localStorage.getItem("token"))) || [];

            setData(res);
        };

        fetchTasks();
    }, []);

    return (
        <section className="tasks">
            <div className="tasks-top">
                <div className="title">
                    <h1>Tasks</h1>
                    <p>Organize your tasks here.</p>
                </div>
                <AddButton type={"add"} onClick={() => {}} />
            </div>
            <TasksTable tasks={data} />
        </section>
    );
};

export default Tasks;
