import React, { useState } from "react";
import api from "../services/api";

function AddNote({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    await api.post("/notes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setTitle("");
    setDescription("");
    setFile(null);
    refresh();
  };

  return (
    <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Ders Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", margin: "5px 0" }}
      />
      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", margin: "5px 0" }}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default AddNote;