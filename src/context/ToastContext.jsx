import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info") => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type };

        setToasts(prev => {
            // Keep max 3 toasts
            const updated = [...prev, newToast];

            return updated.slice(-3);
        });

        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            removeToast(id);
        }, 4000);

        return id;
    }, []);

    const removeToast = useCallback(id => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showSuccess = useCallback(
        message => {
            addToast(message, "success");
        },
        [addToast]
    );

    const showError = useCallback(
        message => {
            addToast(message, "error");
        },
        [addToast]
    );

    const showInfo = useCallback(
        message => {
            addToast(message, "info");
        },
        [addToast]
    );

    const showWarning = useCallback(
        message => {
            addToast(message, "warning");
        },
        [addToast]
    );

    const value = {
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showInfo,
        showWarning,
    };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
