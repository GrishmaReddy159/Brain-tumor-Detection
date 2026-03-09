import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    // get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user exists
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {

      // store logged in user
      localStorage.setItem("loggedUser", email);

      // go to upload page
      navigate("/upload");

    } else {

      alert("Invalid credentials. Please signup first.");

    }
  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <div className="card shadow p-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4">
          Brain Tumor AI Login
        </h3>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button className="btn btn-primary w-100">
            Login
          </button>

          <p className="text-center mt-3">
            New user? <Link to="/signup">Signup</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;