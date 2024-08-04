import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import AuthContext from "../Context/notes/AuthContext";

const Note = (props) => {
  const context = useContext(NoteContext);
  const contextAu = useContext(AuthContext);

  const authtoken = contextAu;
  const { notes, getnote, editnote } = context;

  const handleedit = () => {
    props.showAlert("note has been edited", "success");
    props.setMode("primary");
  };

  useEffect(() => {
    getnote();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag || "default",
    });
  };

  const handleclick = (e) => {
    handleedit();
    refClose.current.click();
    e.preventDefault();
    editnote(note.etitle, note.edescription, note.etag, note.id);
  };

  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert} setMode={props.setMode} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={handlechange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={handlechange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handlechange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
                className="btn btn-primary"
                onClick={handleclick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to show here..."}
        </div>
        {authtoken !== null && (
          <>
            {notes.map((note) => (
              <Noteitem
                key={note._id}
                note={note}
                updateNote={updateNote}
                showAlert={props.showAlert}
                setMode={props.setMode}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Note;
