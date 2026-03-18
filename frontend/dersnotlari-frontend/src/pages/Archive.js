import { useEffect, useState } from "react";
import API from "../services/api";

export default function Archive() {
  const [notes, setNotes] = useState([]);

  const getArchived = async () => {
    const res = await API.get("/notes/archive");
    setNotes(res.data);
  };

  useEffect(() => {
    getArchived();
  }, []);

  const hardDelete = async (id) => {
    if (!window.confirm("Bu not kalıcı olarak silinecek! Emin misin?")) return;

    await API.delete(`/notes/hard/${id}`);
    getArchived();
  };

  const restore = async (id) => {
    await API.put(`/notes/restore/${id}`);
    getArchived();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Arşivlenen Notlar</h2>

      <div style={styles.notesGrid}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <h3 style={styles.noteTitle}>{note.courseName}</h3>
              <p style={styles.noteDesc}>{note.description}</p>

              <div style={styles.buttons}>
                <button
                  onClick={() => restore(note.id)}
                  style={styles.restore}
                >
                  Geri Yükle
                </button>

                <button
                  onClick={() => hardDelete(note.id)}
                  style={styles.delete}
                >
                  Kalıcı Sil
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Arşiv boş</p>
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

  noteTitle: {
    color: "#f06292",
    marginBottom: "10px",
  },

  noteDesc: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "10px",
  },

  buttons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },

  restore: {
    background: "#66bb6a",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  delete: {
    background: "#e53935",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};