import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AuthContext from "./AuthContext";

const NoteState = (props) => {
  const contex = useContext(AuthContext);
  const authtoken = contex;

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const url = "http://localhost:5000";

  console.log(authtoken);

  //Get all notes.
  const getnote = async () => {
    const response = await fetch(`${url}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjQ3MWI5OWJkZmRiY2Q2ODc5YjNiIn0sImlhdCI6MTcyMjUwMDkxM30.o2J7kj9JltOoPUQ7ScKVfBnQr9gquG0YokRu3XYfoGg",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note.
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjQ3MWI5OWJkZmRiY2Q2ODc5YjNiIn0sImlhdCI6MTcyMjUwMDkxM30.o2J7kj9JltOoPUQ7ScKVfBnQr9gquG0YokRu3XYfoGg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    setNotes(notes.concat(json));
  };

  //Delete a note.
  const deletenote = async (_id) => {
    const response = await fetch(`${url}/api/notes/deletenotes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjQ3MWI5OWJkZmRiY2Q2ODc5YjNiIn0sImlhdCI6MTcyMjUwMDkxM30.o2J7kj9JltOoPUQ7ScKVfBnQr9gquG0YokRu3XYfoGg",
      },
      body: JSON.stringify({ _id }),
    });
    const json = await response.json();
    setNotes(json);

    console.log("delteing note" + _id);
    const newNote = notes.filter((note) => note._id !== _id);
    setNotes(newNote);
  };

  //Edit a note.
  const editnote = async (title, description, tag, _id) => {
    const response = await fetch(`${url}/api/notes/updatenotes/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjQ3MWI5OWJkZmRiY2Q2ODc5YjNiIn0sImlhdCI6MTcyMjUwMDkxM30.o2J7kj9JltOoPUQ7ScKVfBnQr9gquG0YokRu3XYfoGg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

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
