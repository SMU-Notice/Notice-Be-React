import React from 'react';
import {createBrowserRouter} from "react-router-dom";

import RootLayout from './layout/root-layout';
import MainPage from './pages/Main/MainPage';
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
  AuthNaver,
  AuthGoogle,
  BookMarkPage
} from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    children: [
        {
            index: true,
            element: <Main/>
        },
        {
            path: 'Login',
            element: <Login/>
        },
        {
          path: 'MainPage',
          element: <MainPage/>
        },
        {
            path: 'Board/:postId',
            element: <Board/>
        },
        {
            path: 'MainBoard',
            element: <MainBoard/>
        },
        {
            path: 'MainBoardDetail',
            element: <MainBoardDetail/>
        },
        {
            path: 'Map',
            element: <Map/>
        },
        {
            path: 'MyPageBookMark',
            element: <MyPageBookMark/>
        },
        {
            path: 'MyPageProfileEdit',
            element: <MyPageEmailManage/>
        },
        {
            path: 'MyPageEmailManage',
            element: <MyPageProfileEdit/>
        },
        {
            path: 'PopularWeeklyBoard',
            element: <PopularWeeklyBoard/>
        },
        {
            path: 'SignUp',
            element: <SignUp/>
        },
        {
            path: 'auth/kakao',
            element: <AuthKakao />
        },
        {
            path: 'auth/naver',
            element: <AuthNaver />
        },
        {
            path: 'auth/google',
            element: <AuthGoogle />
        },
        {
            path: 'bookmark',
            element: <BookMarkPage />
        }
    ]
  },
]);

export default router;