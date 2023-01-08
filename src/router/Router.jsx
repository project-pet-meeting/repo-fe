import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmaliLogin from "../pages/login/components/EmailLogin";
import KakaoLogin from "../pages/login/components/KakaoLogin";
import NaverLogin from "../pages/login/components/NaverLogin";
import Login from "../pages/login/Login";
// import Home from "../pages/home/Home";
const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route path="/login" exact element={<Login />} />
        <Route path="/emaillogin" exact element={<EmaliLogin />} />
        <Route path="/user/kakao/callback" exact element={<KakaoLogin />} />
        <Route path="/login/oauth2/code/naver" exact element={<NaverLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;