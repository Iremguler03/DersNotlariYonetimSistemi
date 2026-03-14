import React from "react";
import api from "../services/api";

function NoteCard({ note, refresh }) {
  const handleDelete = async () => {
    await api.delete(`/notes/${note.id}`);
    refresh();
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{note.courseName}</h3>
      <p>{note.description}</p>
      {note.filePath && (
        <a href={`http://localhost:5020${note.filePath}`} target="_blank" rel="noreferrer">
          Dosya İndir
        </a>
      )}
      <br />
      <button onClick={handleDelete}>Sil</button>
    </div>
  );
}

export default NoteCard;