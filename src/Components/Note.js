import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Note = () => {
  const context = useContext(NoteContext);
  const { notes, getnote } = context;

  useEffect(() => {
    getnote();
  }, []);

  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Note;
