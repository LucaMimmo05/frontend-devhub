import { useState } from "react";
import ModalInputField from "./ModalInputField";
import "../styles/projectmodal.css";
import "../styles/addcommandmodal.css";
import { validateRequired, validateLength } from "../utility/validation";

const AddCommandModal = ({ onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [commandText, setCommandText] = useState("");
    const [example, setExample] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        // Client-side validation
        const validationErrors = {};
        const titleError = validateRequired(title, "Command title") || validateLength(title, 1, 100, "Command title");
        const commandError = validateRequired(commandText, "Command text");

        if (titleError) validationErrors.title = titleError;
        if (commandError) validationErrors.commandText = commandError;

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            return;
        }

        setErrors({});

        if (!title.trim() || !commandText.trim()) return;

        setLoading(true);
        try {
            await onSave({
                title: title.trim(),
                commandText: commandText.trim(),
                example: example.trim(),
                description: description.trim(),
            });
            setTitle("");
            setCommandText("");
            setExample("");
            setDescription("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="blur-bg">
            <div className="box add-command-modal centered small-modal">
                <h2>New Command</h2>
                <form className="command-modal-content" onSubmit={handleSubmit}>
                    <div className="project-modal-inputs">
                        <div className="project-modal-left">
                            <div className="project-modal-input">
                                <span>Title</span>
                                <ModalInputField
                                    type="text"
                                    value={title}
                                    name={"title"}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Command title"
                                    error={!!errors.title}
                                    errorMessage={errors.title}
                                    required
                                    maxLength={100}
                                />
                            </div>

                            <div className="project-modal-input">
                                <span>Command</span>
                                <ModalInputField
                                    type="text"
                                    value={commandText}
                                    name={"commandText"}
                                    onChange={e => setCommandText(e.target.value)}
                                    placeholder="e.g., npm start"
                                />
                            </div>

                            <div className="project-modal-input">
                                <span>Example (Optional)</span>
                                <ModalInputField
                                    type="text"
                                    value={example}
                                    name={"example"}
                                    onChange={e => setExample(e.target.value)}
                                    placeholder="e.g., --watch"
                                />
                            </div>

                            <div className="project-modal-input">
                                <span>Description (Optional)</span>
                                <textarea
                                    value={description}
                                    className="notes-input"
                                    name="description"
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Write a description..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="project-modal-buttons">
                        <button className="button-cancel" type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="button-save" type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCommandModal;
