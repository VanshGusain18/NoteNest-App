import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

const Addnote = () => {
  const contex = useContext(NoteContext);
  const { addnote } = contex;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
  };

  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
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
            id="description"
            name="description"
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
            id="tag"
            name="tag"
            onChange={handlechange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
