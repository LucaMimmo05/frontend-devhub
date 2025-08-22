import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";
const Home = () => {
    const { user } = useAuth();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

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
                <div className="box home-main-box"></div>
            </div>
        </div>
    );
};

export default Home;
