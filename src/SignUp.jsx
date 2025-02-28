import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./redux/slices/UserSlice";
const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigate();
  let formData = new FormData();
formData.append("image", image);
formData.append("email", email);
formData.append("name", name);
formData.append("password", password);

const dispatch = useDispatch();

const handleOnSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const result = await fetch("http://localhost:1100/insert", {
      method: "POST",
      body: formData,  // Sending the FormData directly
      headers: {
        Accept: "application/json",  // No need to set Content-Type
      },
    });

    const data = await result.json();
    console.warn(data);

    if (data) {
      alert("Data saved successfully");
      setEmail("");
      setName("");
      setPassword("");
    }

    dispatch(signIn({ name, email }));
    navigation("/login");

  } catch (error) {
    console.error("Error during the submission", error);
  }
};

  return (
    <>
      <h1>This is Sign up Page </h1>
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

        <input
          type="file"
          accept="image/*"
          // value={image}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" onClick={handleOnSubmit}>
          submit
        </button>
      </form>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  );
};

export default SignUpForm;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JjMjQyNTUyN2ZlZjFhYWQ2ODUxNzAiLCJpYXQiOjE3NDAzOTA1MTUsImV4cCI6MTc0MDM5NDExNX0.dfpgGVAco58zKckVEyvqoHqS0HDsHy2cqtLRSwKrGIA
