import { useState } from 'react'
import './App.css'
import Users from './Users';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from './SignUp';
import LoginForm from './Login';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUpForm />}/>
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/all-users" element={<Users/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
