import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { note, updateNote } = props;

  const handledel = () => {
    props.showAlert("note has been deleted", "success");
    props.setMode("danger");
  };

  const handleclick = () => {
    deletenote(note._id);
    handledel();
  };

  return (
    <div className="col-md-3 my-2 ">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              style={{ marginBottom: "7px" }}
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash mx-2 "
              style={{ marginBottom: "7px" }}
              onClick={handleclick}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
