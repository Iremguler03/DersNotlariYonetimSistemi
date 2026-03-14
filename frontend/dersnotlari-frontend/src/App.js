import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Archive from "./pages/Archive";
import AddNote from "./pages/AddNote";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/notes" element={<Notes />} />
      
        <Route path="/addnotes" element={<AddNote />} />

        <Route path="/archive" element={<Archive />} />

      </Routes>

    </Router>
  );
}

export default App;