import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginForm = () => {

  const user = useSelector((state)=>state.user?.user)
  console.log(user);
  
  
  const [email, setEmail] = useState('');
  const token = localStorage.getItem("token");
  console.log(token);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:1100/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ token
      },
    });
    const data = await res.json();
    // console.log(data, '>>>>>>>>>>');
    localStorage.setItem("token", data.token);
    sessionStorage.setItem("token-s", data.token);
    // if (res) {
    //   alert("Login successfult");
    //   setEmail("");
    //   setPassword("");
    // }
    console.log(data.data,"datattatatatat")

    const userId = data.data._id;
    localStorage.setItem("id", userId);
    
    navigate(`/update-user/${userId}`);
  };


  useEffect(() => {
    const setCookieFunction = (name, value, days) => {
      document.cookie = "name" + "=" + "value" + "expires" + "; path=/";
    };
    console.log(user);
    
    setEmail(user.email)
    setCookieFunction();
  }, []);

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <form autoComplete="on">
        <label>Email:- </label>
        <input
          type="email"
          placeholder="Enter your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Password:- </label>
        <input
          type="password"
          placeholder="Password ...."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit" onClick={handleOnSubmit}>
          submit
        </button>
      </form>
      <Link to="/all-users">
        <button>Show all users </button>
      </Link>
    </>
  );
};

export default LoginForm;
