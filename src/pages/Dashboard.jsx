import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import Home from "../components/Home";
import Projects from "../components/Projects";
import { usePage } from "../context/PageContext";
import ProjectDetails from "../components/ProjectDetails";

const Dashboard = () => {
    const { currentPage, setCurrentPage } = usePage();

    const getActiveItem = value => {
        setCurrentPage(value);
    };
    const renderDashboard = () => {
        switch (currentPage) {
            case "Dashboard":
                return <Home />;

            case "Projects":
                return <Projects />;

            case "Project Details":
                return <ProjectDetails />;
            default:
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
