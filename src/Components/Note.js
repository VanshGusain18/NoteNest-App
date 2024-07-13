import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

const Note = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return note.title;
      })}
    </div>
  );
};

export default Note;
