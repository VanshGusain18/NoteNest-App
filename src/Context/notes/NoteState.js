import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AuthContext from "./AuthContext";

const NoteState = (props) => {
  const context = useContext(AuthContext);
  const { authtoken } = context;

  const [notes, setNotes] = useState([]);

  const url = "http://localhost:5000";

  // Get all notes.
  const getnote = async () => {
    if (authtoken) {
      const response = await fetch(`${url}/api/notes/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken,
        },
      });
      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        setNotes([]);
      }
    }
  };

  // Add a note.
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  // Delete a note.
  const deletenote = async (_id) => {
    const response = await fetch(`${url}/api/notes/deletenotes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    await response.json();
    const newNote = notes.filter((note) => note._id !== _id);
    setNotes(newNote);
  };

  // Edit a note.
  const editnote = async (title, description, tag, _id) => {
    const response = await fetch(`${url}/api/notes/updatenotes/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const newNotes = notes.map((note) => (note._id === _id ? json : note));
    setNotes(newNotes);
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
