import { useToast } from "../context/ToastContext";
import Toast from "./Toast";
import "../styles/toast.css";

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} id={toast.id} message={toast.message} type={toast.type} onClose={removeToast} />
            ))}
        </div>
    );
};

export default ToastContainer;
