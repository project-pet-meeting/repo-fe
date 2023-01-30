import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import MakeMeetingModal from "../pages/map/components/MakeMeetingModal";
import MapForm from "../pages/mapForm/MapForm";
import MapFormModal from "../pages/mapForm/components/MapFormModal";


const Router = () => {
  // const location = useLocation();
  // const background = location.state && location.state.background;

  

  return(
    <BrowserRouter>
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

      </Routes>
    </BrowserRouter>
  );
};

export default Router;