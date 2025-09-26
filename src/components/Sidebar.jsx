import "../styles/sidebar.css";
import SidebarItem from "./SidebarItem";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ConnectGitHub from "./ConnectGitHub";
import { getRepos } from "../service/api";

const Sidebar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const { user } = useAuth();

    const checkToken = () => {
        if (!user?.id) return;

        const token = localStorage.getItem(`githubToken_${user.id}`);

        setIsConnected(token.includes("gho_"));
    };

    useEffect(() => {
        checkToken();

        window.addEventListener("githubLogin", checkToken);

        return () => {
            window.removeEventListener("githubLogin", checkToken);
        };
    }, [user]);

    useEffect(() => {
        const fetchAvatar = async () => {
            if (isConnected && user?.id) {
                try {
                    const data = await getRepos(user.id);

                    if (data?.length > 0) {
                        setAvatarUrl(data[0].owner.avatar_url);
                    }
                } catch (err) {
                    console.error("Errore nel recupero avatar:", err);
                }
            }
        };

        fetchAvatar();
    }, [isConnected, user]);

    useEffect(() => {
        console.log("isConnected aggiornato:", isConnected);
    }, [isConnected]);

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img src="src/assets/devhub-logo-white.svg" alt="DevHub logo" />

                <div className="sidebar-selectors">
                    <div className="sidebar-menu">
                        <h3>MENU</h3>
                        <div className="sidebar-items">
                            <SidebarItem icon="src/assets/sidebar/home.svg" text="Dashboard" page={"/"} />
                            <SidebarItem icon="src/assets/sidebar/folder.svg" text="Projects" page={"/projects"} />
                            <SidebarItem icon="src/assets/sidebar/todo.svg" text="Tasks" page={"/tasks"} />
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <h3>UTILITY</h3>
                        <div className="sidebar-items">
                            <SidebarItem icon="src/assets/sidebar/github.svg" text="Github Profile" page={"/github"} />
                            <SidebarItem icon="src/assets/sidebar/notes.svg" text="Notes" page={"/notes"} />
                            <SidebarItem icon="src/assets/sidebar/command.svg" text="Commands" page={"/commands"} />
                        </div>
                    </div>
                </div>
            </div>

            {!isConnected && <ConnectGitHub />}

            <div className="sidebar-bottom">
                <hr />
                <div className="profile">
                    {isConnected && avatarUrl && <img className="profile-image" src={avatarUrl} alt="Profile" />}
                    <h4>
                        {user?.surname} {user?.name}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
