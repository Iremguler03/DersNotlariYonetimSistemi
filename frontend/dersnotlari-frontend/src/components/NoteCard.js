import React from "react";
import api from "../services/api";

function NoteCard({ note, refresh }) {
  const handleDelete = async () => {
    await api.delete(`/notes/${note.id}`);
    refresh();
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      {note.filePath && (
        <a href={`https://localhost:5001/${note.filePath}`} target="_blank">Dosya İndir</a>
      )}
      <br />
      <button onClick={handleDelete}>Sil</button>
    </div>
  );
}

export default NoteCard;