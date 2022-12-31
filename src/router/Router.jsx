import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "../pages/chat/Chat";
import ChatForm from "../pages/chat/components/ChatForm";
import PetInfo from "../pages/firstLogin/components/PetInfo";
import FirstLogin from "../pages/firstLogin/FirstLogin";
import EmaliLogin from "../pages/login/components/EmailLogin";
import KakaoLogin from "../pages/login/components/KakaoLogin";
import NaverLogin from "../pages/login/components/NaverLogin";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
// import Home from "../pages/home/Home";
const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/emaillogin" exact element={<EmaliLogin />} />
        <Route path="/firstlogin" exact element={<FirstLogin />} />
        <Route path="/firstlogin/pet" exact element={<PetInfo />} />
        <Route path="/user/kakao/callback" exact element={<KakaoLogin />} />
        <Route path="/login/oauth2/code/naver" exact element={<NaverLogin />} />

        <Route path="/chat" exact element={<Chat />} />
        <Route path="/chatform" exact element={<ChatForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;