import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./Components/Common/404";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Signup/Login";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<App />} />
        <Route path="explore" element={<App />} />
        <Route path="communities" element={<App />} />
        <Route path="notifications" element={<App />} />
        <Route path="messages" element={<App />} />
        <Route path="bookmarks" element={<App />} />
        <Route path="twitter_blue" element={<App />} />
        <Route path="profile" element={<Signup />} /> 
        {/* ths profile url sign up for temporory  */}
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/*" element={<Notfound/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
