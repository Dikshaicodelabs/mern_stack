import React, { useEffect, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async(e)=>{
    e.preventDefault();
        const res= await fetch('http://localhost:1100/user',
        {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
        }
        );
        const data = await res.json();
        // console.log(data, '>>>>>>>>>>');
        localStorage.setItem("token", data.token)
        sessionStorage.setItem("token-s", data.token)
        // if (res) {
        //   alert("Login successfult");
        //   setEmail("");
        //   setPassword("");
        // }
  }

  
    const token = localStorage.getItem("token");
    console.log(token);

    useEffect(()=>{
      const setCookieFunction = (name, value, days) => {
       
        document.cookie = "name" + "=" + "value" + "expires" + "; path=/";
        
    };
    setCookieFunction()
    },[])
    
 
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

        <button 
        type="submit" 
        onClick={handleOnSubmit}>
          submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
