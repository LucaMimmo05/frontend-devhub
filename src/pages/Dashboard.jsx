import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useState } from "react";
import Home from "../components/Home";

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    const getActiveItem = value => {
        setActiveItem(value);
    };
    const renderDashboard = () => {
        console.log("Active item:" + activeItem);
        switch (activeItem) {
            case "Dashboard":
                return <Home />;
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
