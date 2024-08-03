import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

const Addnote = (props) => {
  const contex = useContext(NoteContext);
  const { addnote } = contex;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.handleadd();
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
            value={note.title}
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
            value={note.description}
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
            value={note.tag}
            onChange={handlechange}
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 3 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleclick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
