// Navbar.js
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyNotes</div>
      <div style={styles.links}>
        {isAuthenticated ? (
          <>
            <Link to="/notes" style={styles.link}>
              Notlar
            </Link>
            <Link to="/addnote" style={styles.link}>
              Not Ekle
            </Link>
            <Link to="/archive" style={styles.link}>
              Arşiv
            </Link>{" "}
            {/* 👈 EKLENDİ */}
            <button onClick={logout} style={styles.button}>
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Giriş Yap
            </Link>
            <Link to="/register" style={styles.link}>
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f7c5d0", // toz pembe
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "0.3s",
    backgroundColor: "transparent",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    backgroundColor: "#fff",
    color: "#f06292",
    transition: "0.3s",
  },
};
