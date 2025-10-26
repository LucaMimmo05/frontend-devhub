import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";
import Task from "../components/Task";
import RepositoryItem from "../components/RepositoryItem";
import Calendar from "../components/Calendar";
import { getCommand, getRepos, getTasksNotCompleted } from "../service/api";
import { getFormattedDate, getFormattedTime } from "../utility/dateformatter";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Home = () => {
    const { user } = useAuth();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [tasks, setTasks] = useState([]);
    const [command, setCommand] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await getTasksNotCompleted(localStorage.getItem("accessToken"));

                setTasks(res);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();

        const fetchCommand = async () => {
            try {
                const res = await getCommand(localStorage.getItem("accessToken"));

                setCommand(res);
            } catch (error) {
                console.error("Error fetching command:", error);
            }
        };

        fetchCommand();

        const fetchRepos = async () => {
            try {
                const res = await getRepos("updated", 7);

                setRepos(res);
            } catch (error) {
                console.error("Error fetching repositories:", error);
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();

        setDate(getFormattedDate(Date.now()));
        setTime(getFormattedTime(Date.now()));
        // eslint-disable-next-line no-undef
        const interval = setInterval(() => {
            setDate(getFormattedDate(Date.now()));
            setTime(getFormattedTime(Date.now()));
        }, 1000);

        // eslint-disable-next-line no-undef
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="home">
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
                        <h2>Tasks</h2>
                    </div>
                    <div className="tasks">
                        <div className="task-top">
                            {tasks && tasks.length > 0 ? (
                                <div className="task-cont">
                                    {tasks.map(task => (
                                        <Task key={task.id} title={task.title} priority={task.priority} />
                                    ))}
                                </div>
                            ) : (
                                <p className="no-tasks-message">All task completed</p>
                            )}
                        </div>
                        <div className="task-bottom">
                            <button onClick={() => navigate("/tasks")}>
                                See tasks{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                                        stroke="#F1F1F1"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="box right-box">
                    <div className="title">
                        <h2>Top Repositories</h2>
                    </div>

                    {loading ? (
                        <div className="centered">
                            <Loader color="#4A90E2" size={60} />
                        </div>
                    ) : repos && repos.length > 0 ? (
                        <div className="repository-cont">
                            {repos.slice(0, 7).map(repo => (
                                <RepositoryItem key={repo.id} data={repo} />
                            ))}
                        </div>
                    ) : (
                        <div className="home-get-started">
                            <div className="get-started-content">
                                <p>Connect your GitHub account to see your repositories</p>
                                <button className="get-started-button" onClick={() => navigate("/github")}>
                                    Go to GitHub
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="box left-bottom-box">
                    {command && Object.keys(command).length > 0 > 0 ? (
                        <>
                            <div className="title">
                                <h2>{command.title}</h2>
                                <h4>{command.commandText}</h4>
                            </div>
                            <p>{command.description}</p>
                        </>
                    ) : (
                        <p className="no-tasks-message">No command available</p>
                    )}
                </div>
                <div className="box center-bottom-box">
                    <Calendar />
                </div>
            </div>
        </section>
    );
};

export default Home;
