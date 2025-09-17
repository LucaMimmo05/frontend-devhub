import "../styles/task.css";

const Task = ({ title, priority }) => {
    let color = "";

    switch (priority) {
        case "LOW":
            color = "green";
            break;
        case "MEDIUM":
            color = "yellow";
            break;
        case "HIGH":
            color = "red";
            break;
        default:
            color = "gray";
    }

    return (
        <div className={`task ${color}`}>
            <p>{title}</p>
        </div>
    );
};

export default Task;
