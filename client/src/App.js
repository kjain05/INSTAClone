import React from "react"
import Navbar from "./components/Navbar"
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/screens/Home'
import Signup from './components/screens/Signup'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Create" element={<CreatePost />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
