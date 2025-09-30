import "../styles/sidebar.css";
import SidebarItem from "./SidebarItem";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ConnectGitHub from "./ConnectGitHub";
import { getRepos } from "../service/api";
import Logo from "../assets/devhub-logo-white.svg";
import HomeIcon from "../assets/sidebar/home.svg";
import FolderIcon from "../assets/sidebar/folder.svg";
import TodoIcon from "../assets/sidebar/todo.svg";
import GithubIcon from "../assets/sidebar/github.svg";
import NotesIcon from "../assets/sidebar/notes.svg";
import CommandIcon from "../assets/sidebar/command.svg";

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

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img src={Logo} alt="DevHub logo" />

                <div className="sidebar-selectors">
                    <div className="sidebar-menu">
                        <h3>MENU</h3>
                        <div className="sidebar-items">
                            <SidebarItem icon={HomeIcon} text="Home" page={"/"} />
                            <SidebarItem icon={FolderIcon} text="Projects" page={"/projects"} />
                            <SidebarItem icon={TodoIcon} text="Tasks" page={"/tasks"} />
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <h3>UTILITY</h3>
                        <div className="sidebar-items">
                            <SidebarItem icon={GithubIcon} text="Github Profile" page={"/github"} />
                            <SidebarItem icon={NotesIcon} text="Notes" page={"/notes"} />
                            <SidebarItem icon={CommandIcon} text="Commands" page={"/commands"} />
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
