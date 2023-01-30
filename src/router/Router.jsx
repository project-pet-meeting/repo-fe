import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Post from "../pages/post/Post";
import Community from "../pages/community/Community";
import CommunityDetail from "../communityDetail/CommunityDetail";
const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addpost" exact element={<Post />} />
        <Route path="/community" exact element={<Community />} />
        <Route path="/community/detail" exact element={<CommunityDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;