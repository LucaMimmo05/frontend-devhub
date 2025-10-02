import { createContext, useState, useContext } from "react";
import { getAllTasks } from "../service/api";
import { useEffect } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                if (token) {
                    const allTasks = await getAllTasks(token);

                    setTasks(allTasks);
                }
            } catch (err) {
                console.error("Error loading tasks:", err);
            }
        };

        fetchTasks();
    }, []);

    return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};

const useTask = () => useContext(TaskContext);

export { TaskProvider, useTask };
