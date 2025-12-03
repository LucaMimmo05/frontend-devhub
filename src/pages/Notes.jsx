import { useState } from "react";
import Button from "../components/Button";
import Note from "../components/Note";
import { deleteNote, getNote, updateNote } from "../service/noteApi";
import "../styles/notes.css";
import AddNoteModal from "../components/AddNoteModal";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { createNote } from "../service/noteApi";
import ShowNoteModal from "../components/ShowNoteModal";
import DeleteModal from "../components/DeleteModal";
import { useToast } from "../context/ToastContext";
import EmptyState from "../components/EmptyState";
const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModal, setAddModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const { showSuccess, showError } = useToast();

    const handleShowModalOpen = currentNote => {
        setCurrentNote(currentNote);
        setShowModal(true);
    };

    const handleSaveNote = async newNote => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.error("No access token found");

                return;
            }

            const savedNote = await createNote(token, newNote);

            console.log("Note saved successfully:", savedNote);
            setNotes(prev => [savedNote, ...prev]);
            setAddModal(false);
            showSuccess("Note created successfully");
        } catch (error) {
            console.error("Error saving note:", error.response?.data || error.message);
            showError("Failed to create note");
        }
    };

    const handleUpdateNote = async noteData => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.error("No access token found");

                return;
            }
            const updatedNote = await updateNote(token, currentNote.id, noteData);

            setNotes(prevNotes => prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
            setShowModal(false);
            showSuccess("Note updated successfully");
        } catch (error) {
            console.error("Error updating note:", error.response?.data || error.message);
            showError("Failed to update note");
        }
    };

    const handleDeleteNote = () => {
        setDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.error("No access token found");

                return;
            }

            await deleteNote(token, currentNote.id);
            setNotes(prevNotes => prevNotes.filter(note => note.id !== currentNote.id));
            setShowModal(false);
            setDeleteModal(false);
            showSuccess("Note deleted successfully");
        } catch (error) {
            console.error("Error deleting note:", error.response?.data || error.message);
            showError("Failed to delete note");
        }
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await getNote(localStorage.getItem("accessToken"));

                setNotes(res);
            } catch (error) {
                console.error("Error fetching notes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <section className="notes">
            <div className="notes-top">
                <div className="title">
                    <h1>Notes</h1>
                    <p>Capture and organize your notes</p>
                </div>
                <Button type={"add"} onClick={() => setAddModal(true)} />
            </div>
            <div className="notes-content">
                {loading ? (
                    <div className="centered">
                        <ClipLoader color="#4A90E2" size={60} />
                    </div>
                ) : notes && notes.length > 0 ? (
                    notes.map(note => <Note key={note.id} data={note} onClick={() => handleShowModalOpen(note)} />)
                ) : (
                    <EmptyState
                        icon={
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 6V5C15 3.89543 14.1046 3 13 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H13C14.1046 21 15 20.1046 15 19V18M18 9L21 12M21 12L18 15M21 12H9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        title="No notes yet"
                        message="Capture your thoughts and ideas by creating your first note."
                        actionButton={<Button type={"add"} onClick={() => setAddModal(true)} />}
                    />
                )}
            </div>
            {showModal && (
                <ShowNoteModal
                    onClose={() => setShowModal(false)}
                    data={currentNote}
                    onSubmit={handleUpdateNote}
                    onDelete={handleDeleteNote}
                />
            )}
            {addModal && <AddNoteModal onClose={() => setAddModal(false)} onSave={handleSaveNote} />}
            {deleteModal && (
                <DeleteModal
                    title={currentNote?.title}
                    onClose={() => setDeleteModal(false)}
                    onDelete={handleConfirmDelete}
                    itemType="note"
                />
            )}
        </section>
    );
};

export default Notes;
