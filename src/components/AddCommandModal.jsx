import { useState } from "react";
import ModalInputField from "./ModalInputField";
import "../styles/projectmodal.css";
import "../styles/addcommandmodal.css";

const AddCommandModal = ({ onClose, onSave, edit, initialData }) => {
    const [title, setTitle] = useState(edit ? initialData.title : "");
    const [commandText, setCommandText] = useState(edit ? initialData.commandText : "");
    const [example, setExample] = useState(edit ? initialData.example : "");
    const [description, setDescription] = useState(edit ? initialData.description : "");

    const handleSubmit = e => {
        e.preventDefault();

        if (!title.trim() || !commandText.trim()) return;
        onSave({
            title: title.trim(),
            commandText: commandText.trim(),
            example: example.trim(),
            description: description.trim(),
        });
        setTitle("");
        setCommandText("");
        setExample("");
        setDescription("");
        if (edit) {
            onClose();
        }
    };

    return (
        <div className="blur-bg">
            <div className="box add-command-modal centered small-modal">
                <h2>{edit ? "Edit Command" : "New Command"}</h2>
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
                        <button className="button-save" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCommandModal;
