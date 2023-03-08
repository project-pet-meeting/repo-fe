import React from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import MakeMeetingModal from "../pages/map/components/MakeMeetingModal";
import MapForm from "../pages/mapForm/MapForm";
import MapFormModal from "../pages/mapForm/components/MapFormModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetInfo from "../pages/firstLogin/components/PetInfo";
import FirstLogin from "../pages/firstLogin/FirstLogin";
import EmaliLogin from "../pages/login/components/EmailLogin";
import Login from "../pages/login/Login";
// import Home from "../pages/home/Home";

const Router = () => {
  // const location = useLocation();
  // const background = location.state && location.state.background;

  

  return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={<Home />} /> */}
         <div>navibar</div>
        {/* 백그라운드 객체가 없어도 렌더링 */}
        <Routes 
          // location={!background || location}
        >
        <Route path="/" element={<Home />}>
          {/* {background && <Route path="makemeetingmodal" element={<MakeMeetingModal />} />} */}
        </Route>
          <Route path="makemeetingmodal" element={<MakeMeetingModal />} />
        <Route path="/mapform" element={<MapForm />} />
        <Route path="/mapformmodal" element={<MapFormModal />} />
        <Route path="*" element={<div>404 not found</div>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/emaillogin" exact element={<EmaliLogin />} />
        <Route path="/firstlogin" exact element={<FirstLogin />} />
        <Route path="/firstlogin/pet" exact element={<PetInfo />} />
        <Route path="/user/kakao/callback" exact element={<KakaoLogin />} />
        <Route path="/login/oauth2/code/naver" exact element={<NaverLogin />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;