import { useState } from "react";
import ModalInputField from "./ModalInputField";
import "../styles/projectmodal.css";
import "../styles/addnotemodal.css";

const AddNoteModal = ({ onClose, onSave, edit, initialData }) => {
    const [title, setTitle] = useState(edit ? initialData.title : "");
    const [content, setContent] = useState(edit ? initialData.content : "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!title.trim() && !content.trim()) return;
        
        setLoading(true);
        try {
            await onSave({ title: title.trim(), content: content.trim() });
            setTitle("");
            setContent("");
            if (edit) {
                onClose();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="blur-bg">
            <div className="box project-modal centered small-modal">
                <h2>{edit ? "Edit Note" : "New Note"}</h2>
                <form className="project-modal-content" onSubmit={handleSubmit}>
                    <div className="project-modal-inputs">
                        <div className="project-modal-left">
                            <div className="project-modal-input">
                                <span>Title</span>
                                <ModalInputField
                                    type="text"
                                    value={title}
                                    name={"title"}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Note title"
                                />
                            </div>

                            <div className="project-modal-input project-notes">
                                <span>Text</span>
                                <textarea
                                    value={content}
                                    className="notes-input"
                                    name="content"
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="Write your note..."
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

export default AddNoteModal;
