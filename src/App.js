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
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (messenge, type) => {
    setAlert({
      msg: messenge,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const handleadd = () => {
    showAlert("note has been added", "success");
  };
  const handledel = () => {
    showAlert("note has been deleted", "success");
  };
  const handleedit = () => {
    showAlert("note has been edited", "success");
  };

  return (
    <>
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    handleadd={handleadd}
                    handledel={handledel}
                    handleedit={handleedit}
                  />
                }
              />
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
