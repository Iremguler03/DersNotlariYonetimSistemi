import { useEffect, useState } from "react";
import api from "../services/api";

function Notes() {

  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    api.get("/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    getNotes();
  };

  return (
    <div>

      <h2>Notlar</h2>

      {notes.length === 0 && <p>Henüz not yok</p>}

      {notes.map(note => (
        <div key={note.id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>

          <h3>{note.courseName}</h3>
          <p>{note.description}</p>

          {note.filePath && (
            <a href={`http://localhost:5020${note.filePath}`} target="_blank">
              Dosyayı indir
            </a>
          )}

          <br/>

          <button onClick={()=>deleteNote(note.id)}>
            Sil
          </button>

        </div>
      ))}

    </div>
  );
}

export default Notes;