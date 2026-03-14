import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddNote from './AddNote';

function Notes() {
  const [notes, setNotes] = useState([]);
  const currentUserId = 1; // Örnek: login edilen kullanıcı ID'si

  const refresh = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (err) {
      console.error('Notlar çekilemedi:', err);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      refresh();
    } catch (err) {
      console.error('Not silinemedi:', err);
    }
  };

  return (
    <div>
      <h2>Notlarım</h2>
      <AddNote refresh={refresh} currentUserId={currentUserId} />

      {notes.length === 0 ? (
        <p>Henüz not yok.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
            <h3>{note.courseName}</h3>
            <p>{note.description}</p>
            {note.filePath && <p>Dosya: {note.filePath}</p>}
            <button onClick={() => handleDelete(note.id)}>Sil</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;