import "../styles/sidebaritem.css";
import { useNavigate } from "react-router-dom";
const SidebarItem = ({ icon, text, page }) => {
    const navigate = useNavigate();
    const isActive = window.location.pathname.includes(page) && page !== "/" ? true : window.location.pathname === page;

    const handleClick = () => {
        if (!page) return;
        navigate(page);
    };

    return (
        <div className={`sidebar-item ${isActive ? "active" : ""}`} onClick={handleClick}>
            <img src={icon} alt="" />
            <p>{text}</p>
        </div>
    );
};

export default SidebarItem;
