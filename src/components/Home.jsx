import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";
import Task from "./Task";
import RepositoryItem from "./RepositoryItem";
import Calendar from "./Calendar";
import { getTasks, getCommand, getRepos } from "../service/api";
import { getFormattedDate, getFormattedTime } from "../utility/dateformatter";
const Home = () => {
    const { user } = useAuth();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [tasks, setTasks] = useState([]);
    const [command, setCommand] = useState({});
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await getTasks(localStorage.getItem("accessToken"));

                setTasks(res);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();

        const fetchCommand = async () => {
            try {
                const res = await getCommand(user.id, localStorage.getItem("accessToken"));

                setCommand(res);
            } catch (error) {
                console.error("Error fetching command:", error);
            }
        };

        fetchCommand();

        const fetchRepos = async () => {
            try {
                const res = await getRepos(user.id);

                setRepos(res);
            } catch (error) {
                console.error("Error fetching repositories:", error);
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
                            {tasks && tasks.length > 0 ? (
                                <>
                                    <div className="task-cont">
                                        {tasks.slice(0, 6).map(task => (
                                            <Task key={task.id} title={task.title} priority={task.priority} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <h4>All task completed</h4>
                            )}
                            <button>
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
                        <div className="task-right"></div>
                    </div>
                </div>
                <div className="box right-box">
                    <div className="title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path
                                d="M7.5 24.5289C6.63866 24.2849 5.95965 23.9146 5.39752 23.3525C3.75 21.705 3.75 19.0532
                                 3.75 13.75C3.75 8.4467 3.75 5.79505 5.39752 
                                4.14753C7.04505 2.5 9.6967 2.5 15 2.5C20.3032 2.5 22.955 2.5 24.6025
                                 4.14753C26.25 5.79505 26.25 8.4467
                                 26.25 13.75C26.25 19.0532 26.25 21.705 24.6025
                                  23.3525C24.0404 23.9146 23.3614 24.2849 22.5 24.5289"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M15 25.241C14.4822 25.241 14.0656 25.6401 13.2323 26.4385C12.4243 27.2125 12.0203
                                 27.5995
                                 11.6797 27.478C11.6378 27.4631 11.5976 27.4435 11.5595 27.4194C11.25 27.2232 11.25
                                  26.6389
                                  11.25 25.4702V21.564C11.25 19.6482 11.25 18.6904 11.7992 18.0951C12.3483 17.5 13.2323 
                                  17.5 15 17.5C16.7677 17.5 17.6516 17.5 18.2009 18.0951C18.75 18.6904 18.75 19.6482
                                   18.75 21.564V25.4702C18.75 26.6389 18.75 27.2232 18.4405 27.4194C18.4024
                                    27.4435 18.3621
                                    27.4631 18.3204 27.478C17.9797 27.5995 17.5757 27.2125 16.7677
                                     26.4385C15.9344 25.6401
                                     15.5178 25.241 15 25.241Z"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 12.5H20"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 7.5H15"
                                stroke="#F1F1F1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h2>Top Repositories</h2>
                    </div>
                    <div className="repository-cont">
                        {repos && repos.slice(0, 7).map(repo => <RepositoryItem key={repo.id} data={repo} />)}
                    </div>
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
                        <h4>Nothing to see</h4>
                    )}
                </div>
                <div className="box center-bottom-box">
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default Home;
