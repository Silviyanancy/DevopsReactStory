import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './pages/Home';
import CreateStory from './pages/CreateStory';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import {auth} from "./firebase-config";
 
function App() {
  //Firebase Authentication
  const [Auth, setAuth] = useState(localStorage.getItem("Auth"));

  //Firebase signout
  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        
        {/*If not authenticated show the login page or logout*/}
        {!Auth ? (
        <Link to="/login"> Login </Link>
        ) : (
          <>
          <Link to="/createstory"> Create Story</Link>
          <button onClick={signOutUser}> Log Out</button>
          </>
        )}        
      </nav>
      <Routes>
        <Route path="/" element={<Home Auth={Auth}/>} />
        <Route path="/createstory" element={<CreateStory Auth={Auth} />} />
        <Route path="/login" element={<Login setAuth={setAuth}/>} />
      </Routes>
    </Router>
  );
}
 
export default App;
