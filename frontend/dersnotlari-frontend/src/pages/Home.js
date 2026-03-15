// Home.js
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Sayfama Hoş Geldiniz</h1>
        <p style={styles.subtitle}>
        Başlamak için giriş yapın veya kayıt olun!        </p>
        <div style={styles.buttons}>
          <Link to="/login" style={styles.button}>Login</Link>
          <Link to="/register" style={styles.button}>Register</Link>
        </div>
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
  content: {
    backgroundColor: "rgba(255, 240, 245, 0.85)",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  title: {
    color: "#f06292",
    fontSize: "36px",
    marginBottom: "20px",
  },
  subtitle: {
    color: "#333",
    fontSize: "18px",
    marginBottom: "30px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#f06292",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
  },
};