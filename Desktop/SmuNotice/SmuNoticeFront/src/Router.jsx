import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { 
  Main,
  Login,
  Board,
  MainBoard,
  MainBoardDetail,
  Map, 
  MyPageBookMark,
  MyPageEmailManage,
  MyPageProfileEdit, 
  PopularWeeklyBoard,
  SignUp,
  NotFound,
  AuthKakao,
  AuthGoogle
} from "./pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
        <Route path="Board" element={<Board />} />
        <Route path="MainBoard" element={<MainBoard />} />
        <Route path="MainBoardDetail" element={<MainBoardDetail />} />
        <Route path="Map" element={<Map />} />
        <Route path="MyPageBookMark" element={<MyPageBookMark />} />
        <Route path="MyPageEmailManage" element={<MyPageEmailManage />} />
        <Route path="MyPageProfileEdit" element={<MyPageProfileEdit />} />
        <Route path="PopularWeeklyBoard" element={<PopularWeeklyBoard />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="api/auth/login/kakao" element={<AuthKakao />} />
        <Route path="api/auth/login/google" element={<AuthGoogle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

