import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6686b61daae175f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "third",
      description: "this is my third note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
