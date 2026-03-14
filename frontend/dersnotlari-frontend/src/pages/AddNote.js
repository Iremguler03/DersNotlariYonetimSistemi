import { useState } from "react";
import api from "../services/api";

function AddNote() {

const [courseName,setCourseName]=useState("")
const [description,setDescription]=useState("")
const [file,setFile]=useState(null)

const addNote = async () => {
  try{

    const formData = new FormData()

    formData.append("courseName",courseName)
    formData.append("description",description)
    formData.append("file",file)

    await api.post("/notes",formData)

    alert("Not eklendi")

  }catch(err){
    console.log(err)
  }
}

return(

<div>

<input onChange={(e)=>setCourseName(e.target.value)} />

<textarea onChange={(e)=>setDescription(e.target.value)} />

<input type="file" onChange={(e)=>setFile(e.target.files[0])} />

<button onClick={addNote}>Add Note</button>

</div>

)

}

export default AddNote