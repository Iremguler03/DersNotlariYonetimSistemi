// AddNote.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddNote() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const addNote = async () => {
    try {
      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("description", description);
      if (file) formData.append("file", file);

      await API.post("/notes", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Not başarıyla eklendi!");
      navigate("/notes");
    } catch (err) {
      alert("Not eklenemedi!");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Yeni Bir Not Ekle</h2>
        <input
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />
        <button onClick={addNote} style={styles.button}>Not Ekle</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff0f5", // açık pembe arka plan
    padding: "40px 0",
  },
  formContainer: {
    backgroundColor: "rgba(255, 240, 245, 0.95)",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#f06292",
    marginBottom: "20px",
    fontSize: "24px",
  },
  input: {
    padding: "10px 15px",
    margin: "10px 0",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #f7c5d0",
    outline: "none",
  },
  textarea: {
    padding: "10px 15px",
    margin: "10px 0",
    width: "100%",
    height: "100px",
    borderRadius: "8px",
    border: "1px solid #f7c5d0",
    outline: "none",
  },
  fileInput: {
    margin: "10px 0",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f06292",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};