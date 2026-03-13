import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login(){

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

const navigate = useNavigate()

const login = async()=>{

const res = await API.post("/auth/login",{
username,
password
})

localStorage.setItem("token",res.data.token)

navigate("/notes")   // LOGIN SONRASI SAYFA DEĞİŞİR

}

return(

<div>

<h2>Login</h2>

<input placeholder="username" onChange={e=>setUsername(e.target.value)}/>

<input placeholder="password" type="password"
onChange={e=>setPassword(e.target.value)}/>

<button onClick={login}>Login</button>

</div>

)

}