import React, { useContext } from "react";
import Note from "./Note";
import AuthContext from "../Context/notes/AuthContext";
const Home = (props) => {
  const contex = useContext(AuthContext);
  const { authtoken } = contex;

  return (
    <div className="container my-2">
      {authtoken === null ? (
        <p class="d-flex justify-content-center">
          Login or Signup to use NoteNest
        </p>
      ) : (
        <Note
          alert={props.alert}
          showAlert={props.showAlert}
          setMode={props.setMode}
        />
      )}
    </div>
  );
};

export default Home;
