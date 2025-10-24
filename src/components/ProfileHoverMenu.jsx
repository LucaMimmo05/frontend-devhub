import "../styles/profilehovermenu.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const ProfileHoverMenu = ({ onClose }) => {
    const { logout } = useAuth();
    const [isExiting, setIsExiting] = useState(false);

    const handleLogout = () => {
        setIsExiting(true);
        const timer = window.setTimeout(() => {
            logout();
            if (onClose) onClose();
        }, 200);

        return () => window.clearTimeout(timer);
    };

    return (
        <div className={`profile-hover-menu ${isExiting ? "exit" : ""}`}>
            <div className="menu-setting menu-logout" onClick={handleLogout}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    color="#ffffff"
                    fill="none"
                >
                    <path
                        d="M7.00003 3C6.07006 3 5.60507 3 5.22357 3.10222C4.1883
                        3.37962 3.37966 4.18827 3.10225 5.22354C3.00003 5.60504 
                        3.00003 6.07003 3.00003 7L3.00003 17C3.00003 17.93 3.00003
                        18.395 3.10225 18.7765C3.37965 19.8117 4.1883 20.6204
                        5.22357 20.8978C5.60507 21 6.07006 21 7.00003 21"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.5001 16.5C16.5001 16.5 21 13.1858 21 12C21 10.8141 16.5 7.5 16.5 7.5M20 12L8.00003 12"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h4>Logout</h4>
            </div>
        </div>
    );
};

export default ProfileHoverMenu;
