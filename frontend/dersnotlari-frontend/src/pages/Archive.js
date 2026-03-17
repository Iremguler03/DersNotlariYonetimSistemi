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

      <div style={styles.grid}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} style={styles.card}>
              <h3>{note.courseName}</h3>
              <p>{note.description}</p>

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
    padding: "40px",
    background: "#fff0f5",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    color: "#f06292",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
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
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  delete: {
    background: "#e53935",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};