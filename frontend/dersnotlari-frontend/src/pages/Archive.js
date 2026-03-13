import React, { useEffect, useState } from "react";
import api from "../services/api";

function Archive() {
  const [archived, setArchived] = useState([]);

  const getArchive = async () => {
    const res = await api.get("/notes/archive");
    setArchived(res.data);
  };

  useEffect(() => {
    getArchive();
  }, []);

  const handleHardDelete = async (id) => {
    await api.delete(`/notes/hard/${id}`);
    getArchive();
  };

  return (
    <div>
      <h2>Arşivlenmiş Notlar</h2>
      {archived.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <button onClick={() => handleHardDelete(note.id)}>Kalıcı Sil</button>
        </div>
      ))}
    </div>
  );
}

export default Archive;