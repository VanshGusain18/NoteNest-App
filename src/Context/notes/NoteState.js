import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const url = "http://localhost:5000";

  //Get all notes.
  const getnote = async () => {
    const response = await fetch(`${url}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmIxMzVhOWNmZGYwOGE1MTNhOTU5In0sImlhdCI6MTcyMDEwMzMxNX0.fQ2N0hDk2zw9L2WStgK_x_gB3sPzUeibkjLt2_sAd2g",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a note.
  const addnote = async ({ title, description, tag }) => {
    const response = await fetch(`${url}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmIxMzVhOWNmZGYwOGE1MTNhOTU5In0sImlhdCI6MTcyMDEwMzMxNX0.fQ2N0hDk2zw9L2WStgK_x_gB3sPzUeibkjLt2_sAd2g",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

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
  const deletenote = async (_id) => {
    const response = await fetch(`${url}/api/notes/deletenotes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmIxMzVhOWNmZGYwOGE1MTNhOTU5In0sImlhdCI6MTcyMDEwMzMxNX0.fQ2N0hDk2zw9L2WStgK_x_gB3sPzUeibkjLt2_sAd2g",
      },
      body: JSON.stringify({ _id }),
    });
    const json = await response.json();

    console.log("delteing note" + _id);
    const newNote = notes.filter((note) => note._id !== _id);
    setNotes(newNote);
  };

  //Edit a note.
  const editnote = async (title, description, tag, _id) => {
    const response = await fetch(`${url}//api/notes/updatenotes/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmIxMzVhOWNmZGYwOGE1MTNhOTU5In0sImlhdCI6MTcyMDEwMzMxNX0.fQ2N0hDk2zw9L2WStgK_x_gB3sPzUeibkjLt2_sAd2g",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === _id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, getnote, addnote, deletenote, editnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
