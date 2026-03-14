import React, { useState } from 'react';
import api from '../services/api';

function AddNote({ refresh }) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!noteTitle) { alert("Ders adı boş olamaz!"); return; }

    try {
      const formData = new FormData();
      formData.append('CourseName', noteTitle);
      formData.append('Description', noteDescription || "");
      if (file) formData.append('file', file);

      const token = localStorage.getItem('token');
      const response = await api.post('/notes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Not eklendi:', response.data);
      setNoteTitle('');
      setNoteDescription('');
      setFile(null);
      refresh();
    } catch (err) {
      console.error('Not eklenemedi:', err);
      alert('Not eklenemedi. Token geçerli olmalı ve tüm zorunlu alanlar dolu olmalı.');
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" placeholder="Ders adı" value={noteTitle} onChange={(e)=>setNoteTitle(e.target.value)} required />
      <textarea placeholder="Açıklama" value={noteDescription} onChange={(e)=>setNoteDescription(e.target.value)} />
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
      <button type="submit">Not Ekle</button>
    </form>
  );
}

export default AddNote;