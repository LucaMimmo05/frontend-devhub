import { useEffect } from "react";
import Button from "../components/Button";
import TasksTable from "../components/TasksTable";
import "../styles/tasks.css";
import { getTasksNotCompleted } from "../service/api";
import { useState } from "react";
import TasksModal from "../components/TasksModal";
import { useTask } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
    const { tasks, setTasks } = useTask();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = (await getTasksNotCompleted(localStorage.getItem("token"))) || [];

            setTasks(res);
        };

        fetchTasks();
    }, [setTasks]);

    const handleClick = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <section className="tasks">
            <div className="tasks-top">
                <div className="title">
                    <h1>Tasks</h1>
                    <p>Organize your tasks here.</p>
                </div>
                <div className="tasks-buttons">
                    <Button
                        type={"Archive"}
                        onClick={() => {
                            navigate("/tasks/archive");
                        }}
                    />
                    <Button type={"add"} onClick={handleClick} />
                </div>
            </div>
            {modalOpen && <TasksModal onClose={handleClose} title={"Create new Task"} />}
            <TasksTable tasks={tasks} />
        </section>
    );
};

export default Tasks;
