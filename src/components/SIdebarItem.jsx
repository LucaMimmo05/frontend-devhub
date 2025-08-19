import "../styles/sidebaritem.css";
const SidebarItem = ({ icon, text, isActive, onClick }) => {
    return (
        <div className={`sidebar-item ${isActive ? "active" : ""}`} onClick={onClick}>
            <img src={icon} alt="" />
            <p>{text}</p>
        </div>
    );
};

export default SidebarItem;
