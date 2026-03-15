// Notes.js
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        alert("Notlar alınamadı!");
      }
    };
    fetchNotes();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Notlarınız</h2>
      <div style={styles.notesGrid}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <h3 style={styles.noteTitle}>{note.courseName}</h3>
              <p style={styles.noteDesc}>{note.description}</p>
              {note.fileUrl && (
                <a href={note.fileUrl} target="_blank" rel="noreferrer" style={styles.fileLink}>
                  Dosyaları Gör
                </a>
              )}
            </div>
          ))
        ) : (
          <p>Not bulunmuyor.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    minHeight: "80vh",
    backgroundColor: "#fff0f5",
  },
  title: {
    color: "#f06292",
    textAlign: "center",
    marginBottom: "30px",
  },
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  noteCard: {
    backgroundColor: "rgba(255, 240, 245, 0.9)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  },
  noteTitle: {
    color: "#f06292",
    marginBottom: "10px",
  },
  noteDesc: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "10px",
  },
  fileLink: {
    color: "#f06292",
    textDecoration: "none",
    fontWeight: "bold",
  },
};