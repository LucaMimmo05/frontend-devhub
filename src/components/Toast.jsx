/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "../styles/toast.css";

const Toast = ({ id, message, type, onClose }) => {
    const [progress, setProgress] = useState(100);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const duration = 4000;
        const interval = 50;
        const decrement = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - decrement;

                if (newProgress <= 0) {
                    clearInterval(timer);

                    return 0;
                }

                return newProgress;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300);
    };

    return (
        <div className={`toast toast-${type} ${isExiting ? "toast-exit" : ""}`}>
            <div className="toast-content">
                <p className="toast-message">{message}</p>
                <button className="toast-close" onClick={handleClose} aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div className="toast-progress">
                <div className="toast-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default Toast;
