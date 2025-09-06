import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";
import axios from "axios";
import Task from "./Task";
const Home = () => {
    const { user } = useAuth();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getFormattedDate = () => {
            const now = new Date();
            const options = { weekday: "long", day: "numeric", month: "long" };
            // eslint-disable-next-line no-undef
            const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
            const weekday = parts.find(p => p.type === "weekday").value;
            const day = parts.find(p => p.type === "day").value;
            const month = parts.find(p => p.type === "month").value;
            const formattedDate = `${weekday} ${day}, ${month}`;

            return `${formattedDate}`;
        };

        const getFormattedTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });

            return formattedTime;
        };

        getTasks();

        setDate(getFormattedDate());
        setTime(getFormattedTime());
        // eslint-disable-next-line no-undef
        const interval = setInterval(() => {
            setDate(getFormattedDate());
            setTime(getFormattedTime());
        }, 1000);

        // eslint-disable-next-line no-undef
        return () => clearInterval(interval);
    }, []);

    const getTasks = async () => {
        axios
            .get("http://localhost:8080/api/task", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Errore nella richiesta: ", error);
            });
    };

    return (
        <div className="home">
            <div className="home-top">
                <h1>Welcome back, {user.name}!</h1>
                <div className="home-date-time">
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
            </div>

            <div className="home-content">
                <div className="box home-main-box">
                    <div className="title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path
                                d="M9.99756 20H14.9975M9.99756 13.75H19.9975"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M9.375 4.375C7.43025 4.43334 6.27077 4.6498 
                                5.46847 5.45284C4.37012 6.55221 4.37012 8.32163 
                                4.37012 11.8605V19.993C4.37012 23.5319 4.37012 
                                25.3013 5.46847 26.4006C6.56682 27.5 8.33459 27.5
                                 11.8701 27.5H18.1201C21.6556 27.5 23.4234 27.5 24.5218
                                  26.4006C25.6201 25.3013 25.6201 23.5319 25.6201
                                   19.993V11.8605C25.6201 8.32163 25.6201 6.55221
                                    24.5218 5.45285C23.7195 4.6498 22.56 4.43334 20.6153 4.375"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                            />
                            <path
                                d="M9.37012 4.6875C9.37012 3.47938 10.3495 2.5
                                 11.5576 2.5H18.4326C19.6408 2.5 20.6201 3.47938 
                                 20.6201 4.6875C20.6201 5.89562 19.6408 6.875
                                  18.4326 6.875H11.5576C10.3495 6.875 9.37012 5.89562 9.37012 4.6875Z"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h2>Today&apos;s Overview</h2>
                    </div>
                    <div className="tasks">
                        <div className="task-left">
                            <div className="task-cont">
                                {tasks.slice(0, 4).map(task => (
                                    <Task key={task.id} title={task.title} priority={task.priority} />
                                ))}
                            </div>
                            <button>
                                See tasks{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                                        stroke="#F1F1F1"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="task-right"></div>
                    </div>
                </div>
                <div className="box right-box"></div>
                <div className="box left-bottom-box"></div>
                <div className="box center-bottom-box"></div>
            </div>
        </div>
    );
};

export default Home;
