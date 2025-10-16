import "../styles/note.css";

const Note = ({ data }) => {
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
                <p>{data.content}</p>
            </div>
            <div className="note-date">
                <p>{formattedDate}</p>
            </div>
        </div>
    );
};

export default Note;
