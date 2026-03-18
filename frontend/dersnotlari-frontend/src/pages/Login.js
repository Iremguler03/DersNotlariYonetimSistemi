// Login.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
      navigate("/notes");
    } catch (err) {
      alert("Giriş başarısız!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Tekrar Hoş Geldiniz</h2>
        <input
          placeholder="Kullanıcı Adı"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Şifre"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={login} style={styles.button}>Giriş Yap</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('https://images.unsplash.com/photo-1612831660801-6f0a9d3db89e?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  formContainer: {
    backgroundColor: "rgba(255, 240, 245, 0.85)", // açık pembe şeffaf
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#f06292",
    marginBottom: "20px",
    fontSize: "28px",
  },
  input: {
    padding: "10px 15px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #f7c5d0",
    width: "250px",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f06292",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
  },
};