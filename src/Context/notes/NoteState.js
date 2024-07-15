import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6686b61daae175f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "one",
      description: "this is my one note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b61daae17523f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "two",
      description: "this is my two note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b2361daae175f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "three",
      description: "this is my three note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b161d23aae175f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "four",
      description: "this is my four note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b61daae175f821154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "one",
      description: "this is my one note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b161daae17523f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "two",
      description: "this is my two note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b2361da1ae175f82154490a",
      user: "6686b135a9cfdf08a513a959",
      title: "three",
      description: "this is my three note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
    {
      _id: "6686b61d23aae175f821541490a",
      user: "6686b135a9cfdf08a513a959",
      title: "four",
      description: "this is my four note",
      tags: "Genral",
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a note.
  const addnote = (title, description, tag) => {
    const note = {
      _id: "6686b61d23aae175f821541490a",
      user: "6686b135a9cfdf08a513a959",
      title: title,
      description: description,
      tags: tag,
      date: "2024-07-04T14:47:57.154Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete a note.
  const deletenote = (_id) => {
    console.log("delteing note" + _id);
    const newNote = notes.filter((note) => note._id !== _id);
    setNotes(newNote);
  };
  //Edit a note.
  const editnote = () => {};
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
