import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./Components/Common/404";
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
        <Route path="profile" element={<App />} />
        <Route path="/*" element={<Notfound/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
