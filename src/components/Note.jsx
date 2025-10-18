import "../styles/note.css";

const Note = ({ data, onClick }) => {
    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="box note">
            <div className="note-title">
                <h2>{data.title}</h2>
                <div className="note-content">
                    <p>{data.content}</p>
                </div>
            </div>
            <div className="note-date">
                <p>{formattedDate}</p>
                <button className="note-see-details" onClick={onClick}>
                    See Details
                </button>
            </div>
        </div>
    );
};

export default Note;
