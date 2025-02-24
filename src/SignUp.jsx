import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:1100/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Data saved succesfully");
      setEmail("");
      setName("");
      setPassword("");
    }
  };
  return (
    <>
      <h1>This is React WebApp </h1>
      <form action="">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleOnSubmit}>
          submit
        </button>
      </form>
      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/all-users">
        <button>Show all users </button>
      </Link>
    </>
  );
};

export default SignUpForm;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JjMjQyNTUyN2ZlZjFhYWQ2ODUxNzAiLCJpYXQiOjE3NDAzOTA1MTUsImV4cCI6MTc0MDM5NDExNX0.dfpgGVAco58zKckVEyvqoHqS0HDsHy2cqtLRSwKrGIA
