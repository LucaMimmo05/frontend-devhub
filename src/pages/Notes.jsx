import { useState } from "react";
import Button from "../components/Button";
import Note from "../components/Note";
import { getNote } from "../service/noteApi";
import "../styles/notes.css";
import NotesModal from "../components/NotesModal";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { createNote } from "../service/noteApi";
const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
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
            setShowModal(false);
        } catch (error) {
            console.error("Error saving note:", error.response?.data || error.message);
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
                <Button type={"add"} onClick={handleClick} />
            </div>
            <div className="notes-content">
                {loading ? (
                    <div className="centered">
                        <ClipLoader color="#4A90E2" size={60} />
                    </div>
                ) : (
                    notes.map(note => <Note key={note.id} data={note} />)
                )}
            </div>
            {showModal && <NotesModal onClose={handleClose} onSave={handleSaveNote} />}
        </section>
    );
};

export default Notes;
