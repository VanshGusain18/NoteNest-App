import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  }, [a]);
  return (
    <div>
      This is about {a.state.name} in course {a.state.course}
    </div>
  );
};

export default About;
