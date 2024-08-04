import React, { useContext } from "react";
import Note from "./Note";
import AuthContext from "../Context/auth/AuthContext";

const Home = (props) => {
  const context = useContext(AuthContext);
  const { authtoken } = context;

  return (
    <div className="container my-2">
      {authtoken === null ? (
        <p className="d-flex justify-content-center">
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
