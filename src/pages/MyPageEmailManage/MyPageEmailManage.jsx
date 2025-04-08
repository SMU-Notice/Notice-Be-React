// import { useNavigate } from "react-router-dom";
import "./MyPageEmailManage.css";
import { CheckID }from "./CheckID";
import { MajorSelect }from "./MajorSelect";
import { EmailInput }from "./EmailInput"
//import React, { useState } from 'react';

const MyPageEmailManage = () => {
  // const navigate = useNavigate();
  // const goToLogin = () => {
  //   navigate('/Login');
  // };

  return (
    <div className="emailmanage-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button>북마크</button>
            <button>
              메일<br/>관리
            </button>
            <button>
              회원<br/>정보
            </button>
          </div>
        </nav>
      </aside>
      <main className="main" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 className="title">회원 정보</h1>
        <CheckID />
        <div>
        <h2 style={{fontSize: '16px'}}>메일 수정하기</h2>
        <EmailInput />
        </div>
        <MajorSelect />
      </main>
    </div>
  );
};


export default MyPageEmailManage;