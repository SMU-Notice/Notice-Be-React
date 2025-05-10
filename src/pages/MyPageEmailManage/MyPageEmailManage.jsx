import { useNavigate } from "react-router-dom";
import "./MyPageEmailManage.css";
import { CheckID }from "./CheckID";
import { MajorSelect }from "./MajorSelect";
import { EmailInput }from "./EmailInput"
//import React, { useState } from 'react';

const MyPageEmailManage = () => {
  const navigate = useNavigate();
  const goToBookmark = () => {
    navigate('/bookmark');
  };
  const goToEmailManage = () => {
    navigate('/MyPageEmailManage');
  };
  

  return (
    <div className="emailmanage-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button onClick={goToBookmark}>북마크</button>
            <button onClick={goToEmailManage}>
              메일<br/>관리
            </button>
            <button>
              회원<br/>정보
            </button>
          </div>
        </nav>
      </aside>
      <div className="main">
        <h1 className="title section">회원 정보</h1>
        <div className="section">
          <CheckID />
        </div>
        <div className="section">
        <h2 style={{fontSize: '16px'}}>메일 수정하기</h2>
        <EmailInput />
        </div>
        <div className="section">
          <MajorSelect />
        </div>
      </div>
    </div>
  );
};


export default MyPageEmailManage;