import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/burgermenu.css";
import Logo from "../assets/devhub-logo-white.svg";
import HomeIcon from "../assets/sidebar/home.svg";
import FolderIcon from "../assets/sidebar/folder.svg";
import TodoIcon from "../assets/sidebar/todo.svg";
import GithubIcon from "../assets/sidebar/github.svg";
import NotesIcon from "../assets/sidebar/notes.svg";
import CommandIcon from "../assets/sidebar/command.svg";
import SettingsIcon from "../assets/sidebar/settings.svg";
import SidebarItem from "./SidebarItem";
import { getGithubUserInfo } from "../service/api";

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [showLogout, setShowLogout] = useState(false);

    const checkToken = useCallback(() => {
        if (!user?.id) return;

        const token = localStorage.getItem(`githubToken_${user.id}`);

        if (token) {
            setIsConnected(token.includes("gho_"));
        } else {
            setIsConnected(false);
        }
    }, [user]);

    useEffect(() => {
        checkToken();
        window.addEventListener("githubLogin", checkToken);

        return () => {
            window.removeEventListener("githubLogin", checkToken);
        };
    }, [user, checkToken]);

    useEffect(() => {
        const fetchAvatar = async () => {
            if (isConnected && user?.id) {
                try {
                    const data = await getGithubUserInfo(user.id);

                    if (data) {
                        setAvatarUrl(data.avatarUrl);
                    }
                } catch (err) {
                    console.error("Errore nel recupero avatar:", err);
                }
            }
        };

        fetchAvatar();
    }, [isConnected, user]);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setIsOpen(false);
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <div className="burger-menu">
            <button
                className={`burger-toggle ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isOpen && <div className="burger-overlay" onClick={closeMenu}></div>}

            <nav className={`burger-nav ${isOpen ? "open" : ""}`}>
                <div className="burger-header">
                    <img src={Logo} alt="DevHub" className="burger-logo" />
                    <button className="burger-close" onClick={closeMenu} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                <div className="burger-content">
                    <div className="burger-section">
                        <h3>MENU</h3>
                        <div className="burger-items">
                            <SidebarItem icon={HomeIcon} text="Home" page="/" onClick={closeMenu} />
                            <SidebarItem icon={FolderIcon} text="Projects" page="/projects" onClick={closeMenu} />
                            <SidebarItem icon={TodoIcon} text="Tasks" page="/tasks" onClick={closeMenu} />
                            <SidebarItem icon={NotesIcon} text="Notes" page="/notes" onClick={closeMenu} />
                            <SidebarItem icon={CommandIcon} text="Commands" page="/commands" onClick={closeMenu} />
                        </div>
                    </div>

                    <div className="burger-section">
                        <h3>UTILITY</h3>
                        <div className="burger-items">
                            <SidebarItem icon={GithubIcon} text="Github Profile" page="/github" onClick={closeMenu} />
                            <SidebarItem icon={SettingsIcon} text="Settings" page="/settings" onClick={closeMenu} />
                        </div>
                    </div>
                </div>

                <div className="burger-footer">
                    <hr />
                    <div className="burger-profile" onClick={() => setShowLogout(!showLogout)}>
                        {isConnected && avatarUrl && <img className="profile-image" src={avatarUrl} alt="Profile" />}
                        {user && (
                            <div className="profile-info">
                                <h4>
                                    {user.name} {user.surname}
                                </h4>
                            </div>
                        )}
                    </div>
                    {showLogout && (
                        <button className="burger-logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default BurgerMenu;
