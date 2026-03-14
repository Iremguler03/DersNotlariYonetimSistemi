import { useEffect, useState } from "react";
import api from "../services/api";

function Archive(){

const [notes,setNotes]=useState([])

useEffect(()=>{

api.get("/notes/archive")
.then(res=>setNotes(res.data))
.catch(err=>console.log(err))

},[])

return(

<div>

<h2>Arşiv</h2>

{notes.map(note=>(
<div key={note.id}>

<h3>{note.courseName}</h3>

<p>{note.description}</p>

</div>
))}

</div>

)

}

export default Archive