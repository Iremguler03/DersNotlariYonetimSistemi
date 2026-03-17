// Notes.js
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const res = await API.get("/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert("Notlar alınamadı!");
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = async (id) => {
    // ✅ Popup ekledik
    if (!window.confirm("Bu not arşive taşınacak. Emin misin?")) return;

    try {
      await API.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      getNotes(); // silince tekrar listele
    } catch (err) {
      console.error(err);
      alert("Not silinemedi!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Notlarınız</h2>

      <div style={styles.notesGrid}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <h3 style={styles.noteTitle}>{note.courseName}</h3>
              <p style={styles.noteDesc}>{note.description}</p>

              {note.filePath && (
                <a
                  href={`http://localhost:5020${note.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.fileLink}
                >
                  Dosyayı Aç
                </a>
              )}

              <div style={styles.buttons}>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={styles.delete}
                >
                  Arşive Taşı
                </button>
                <button
                  onClick={() => navigate(`/edit-note/${note.id}`)}
                  style={styles.update}
                >
                  Güncelle
                </button>
              </div>
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
    transition: "transform 0.2s",
  },
  noteCardHover: {
    transform: "scale(1.03)",
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
    display: "block",
    marginBottom: "10px",
    color: "#f06292",
    textDecoration: "none",
    fontWeight: "bold",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  delete: {
    background: "#e53935",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  update: {
    background: "#f06292",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};