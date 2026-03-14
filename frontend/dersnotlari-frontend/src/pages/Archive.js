import React, { useEffect, useState } from "react";
import api from "../services/api";

function Archive() {

  const [notes,setNotes] = useState([]);

  const fetchArchive = async () => {
    const res = await api.get("/notes/archive");
    setNotes(res.data);
  };

  const hardDelete = async (id) => {
    await api.delete(`/notes/hard/${id}`);
    fetchArchive();
  };

  useEffect(() => {
    fetchArchive();
  }, []);

  return (
    <div>

      <h2>Arşiv</h2>

      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>

          <button onClick={() => hardDelete(note.id)}>
            Kalıcı Sil
          </button>

        </div>
      ))}

    </div>
  );
}

export default Archive;