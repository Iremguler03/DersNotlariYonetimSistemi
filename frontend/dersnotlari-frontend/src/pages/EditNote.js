import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import API from "../services/api"

export default function EditNote(){

const {id}=useParams()

const navigate = useNavigate()

const [courseName,setCourseName]=useState("")
const [description,setDescription]=useState("")


useEffect(()=>{

API.get("/notes",{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}).then(res=>{

const note = res.data.find(n=>n.id==id)

setCourseName(note.courseName)
setDescription(note.description)

})

},[])


const updateNote = async()=>{

const formData = new FormData()

formData.append("courseName",courseName)
formData.append("description",description)

await API.put(`/notes/${id}`,formData,{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

alert("Not güncellendi")

navigate("/notes")

}


return(

<div>

<h2>Not Güncelle</h2>

<input
value={courseName}
onChange={(e)=>setCourseName(e.target.value)}
/>

<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button onClick={updateNote}>
Güncelle
</button>

</div>

)

}