import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/auth/AuthContext";

const Login = (props) => {
  const contex = useContext(AuthContext);
  const { setAuthtoken } = contex;

  const url = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleclick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setAuthtoken(json.authToken);
      props.showAlert("you have been logged in", "success");
      props.setMode("success");
      navigate("/");
    } else {
      props.showAlert("invalid credentials", "error");
      props.setMode("danger");
    }
  };

  const handlechange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [pass, setPass] = useState("password");

  const handlePass = () => {
    if (pass === "password") {
      setPass("text");
    } else {
      setPass("password");
    }
  };

  return (
    <div className="container">
      <h3>Please Login in NoteNest to continue</h3>
      <form>
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handlechange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <p style={{ position: "relative" }}>
            <input
              type={pass}
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handlechange}
            />
            {pass === "password" ? (
              <i
                style={{ position: "absolute", top: "28%", right: "1%" }}
                className="fa-regular fa-eye-slash"
                id="togglePassword"
                onClick={handlePass}
              ></i>
            ) : (
              <i
                style={{ position: "absolute", top: "28%", right: "1%" }}
                className="fa-regular fa-eye"
                id="togglePassword"
                onClick={handlePass}
              ></i>
            )}
          </p>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
