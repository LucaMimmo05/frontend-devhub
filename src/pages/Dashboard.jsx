import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useState } from "react";
import Home from "../components/Home";
import Projects from "../components/Projects";

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    const getActiveItem = value => {
        setActiveItem(value);
    };
    const renderDashboard = () => {
        switch (activeItem) {
            case "Dashboard":
                return <Home />;

            case "Projects":
                return <Projects />;
        }
    };

    return (
        <div className="dashboard">
            <Sidebar onActiveItem={getActiveItem} />

            {renderDashboard()}
        </div>
    );
};

export default Dashboard;
