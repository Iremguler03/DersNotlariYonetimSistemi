import React, { useState, useEffect } from "react";
import api from "../services/api";
import NoteCard from "../components/NoteCard";
import AddNote from "./AddNote";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <h2>Notlarım</h2>
      <AddNote refresh={getNotes} />
      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} refresh={getNotes} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;