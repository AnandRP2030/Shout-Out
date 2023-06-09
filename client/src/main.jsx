import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./Components/Common/404";
import Signup from "./Components/Signup/Signup";
import {Login} from "./Components/Signup/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import FullTweet from "./Components/FullTweet/fullTweet";
import LiveDemo from "./Components/Live Demo/liveDemo";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/fulltweet/:tweetId" element={<FullTweet />} />
            <Route path="/demo" element={<LiveDemo />} />
            <Route path="/communities" element={<App />} />
            <Route path="/notifications" element={<App />} />
            <Route path="/messages" element={<App />} />
            <Route path="/bookmarks" element={<App />} />
            <Route path="/twitter_blue" element={<App />} />
            <Route path="/profile" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/view" element={<LiveDemo />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
