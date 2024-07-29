import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      const { authtoken } = json;
      console.log(authtoken);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const handlechange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
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
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handlechange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
