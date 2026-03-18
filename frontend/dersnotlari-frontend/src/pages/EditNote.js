import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get("/notes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      const note = res.data.find((n) => n.id == id);

      if (note) {
        setCourseName(note.courseName);
        setDescription(note.description);
      }
    });
  }, []);

  const updateNote = async () => {
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("description", description);

    await API.put(`/notes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Not Güncellendi");
    navigate("/notes");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Not Güncelle</h2>

      <div style={styles.card}>
        <input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Ders Adı"
          style={styles.input}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama"
          style={styles.textarea}
        />

        <button onClick={updateNote} style={styles.button}>
          Güncelle
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    minHeight: "80vh",
    backgroundColor: "#fff0f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#f06292",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "rgba(255, 240, 245, 0.9)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #f8bbd0",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #f8bbd0",
    minHeight: "120px",
    outline: "none",
  },
  button: {
    backgroundColor: "#f06292",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s",
  },
};