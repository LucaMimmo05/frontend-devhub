import "../styles/sidebar.css";
import SidebarItem from "./SIdebarItem";

import { useState } from "react";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const [active, isActive] = useState("Dashboard");
    const handleItemClick = item => {
        isActive(item);
    };

    const { user } = useAuth();

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img src="src\assets\devhub-logo-white.svg" alt="" />

                <div className="sidebar-selectors">
                    <div className="sidebar-menu">
                        <h3>MENU</h3>
                        <div className="sidebar-items">
                            <SidebarItem
                                icon="src\assets\sidebar\home.svg"
                                text="Dashboard"
                                onClick={() => handleItemClick("Dashboard")}
                                isActive={active === "Dashboard"}
                            />
                            <SidebarItem
                                icon="src\assets\sidebar\folder.svg"
                                text="Projects"
                                onClick={() => handleItemClick("Projects")}
                                isActive={active === "Projects"}
                            />
                            <SidebarItem
                                icon="src\assets\sidebar\todo.svg"
                                text="Tasks"
                                onClick={() => handleItemClick("Tasks")}
                                isActive={active === "Tasks"}
                            />
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <h3>UTILITY</h3>
                        <div className="sidebar-items">
                            <SidebarItem
                                icon="src\assets\sidebar\github.svg"
                                text="Github"
                                onClick={() => handleItemClick("Github")}
                                isActive={active === "Github"}
                            />
                            <SidebarItem
                                icon={"src/assets/sidebar/notes.svg"}
                                text="Notes"
                                onClick={() => handleItemClick("Notes")}
                                isActive={active === "Notes"}
                            />
                            <SidebarItem
                                icon={"src/assets/sidebar/command.svg"}
                                text="Command"
                                onClick={() => handleItemClick("Command")}
                                isActive={active === "Command"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-bottom">
                <hr />
                <div className="profile">
                    <div className="profile-image"></div>
                    <h4>
                        {user.surname} {user.name}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
