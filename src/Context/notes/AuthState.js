import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [authtoken, setAuthtoken] = useState(null);

  return (
    <AuthContext.Provider value={{ authtoken, setAuthtoken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
