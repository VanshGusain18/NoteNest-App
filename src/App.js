import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AuthState from "./Context/auth/AuthState";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} mode={mode} />
            <Routes>
              <Route
                path="/"
                element={<Home showAlert={showAlert} setMode={setMode} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} setMode={setMode} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} setMode={setMode} />}
              />
            </Routes>
          </Router>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
