import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>

      <h1>Ders Notları Yönetim Sistemi</h1>

      <button onClick={() => navigate("/login")}>
        Giriş Yap
      </button>

      <button onClick={() => navigate("/register")}>
        Kayıt Ol
      </button>

    </div>
  );
}

export default Home;