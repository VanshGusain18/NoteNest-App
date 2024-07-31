import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AuthState from "./Context/notes/AuthState";

function App() {
  return (
    <>
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert msg="this will be done later" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
