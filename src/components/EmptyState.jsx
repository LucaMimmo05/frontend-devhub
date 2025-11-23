import "../styles/emptystate.css";

const EmptyState = ({ icon, title, message, actionButton }) => {
    return (
        <div className="empty-state">
            {icon && <div className="empty-state-icon">{icon}</div>}
            <div className="empty-state-content">
                <h3 className="empty-state-title">{title}</h3>
                <p className="empty-state-message">{message}</p>
            </div>
            {actionButton && <div className="empty-state-action">{actionButton}</div>}
        </div>
    );
};

export default EmptyState;
