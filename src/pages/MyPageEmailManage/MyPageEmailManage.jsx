// import { useNavigate } from "react-router-dom";
import "./MyPageEmailManage.css";
import { CheckID }from "./CheckID";
import { MajorSelect }from "./MajorSelect";
import React, { useState } from 'react';

const MyPageEmailManage = () => {
  // const navigate = useNavigate();
  // const goToLogin = () => {
  //   navigate('/Login');
  // };
  
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="emailmanage-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>북마크</li>
            <li>메일 관리</li>
            <li>회원 정보</li>
          </ul>
        </nav>
      </aside>
      <main className="main" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 className="title">회원 정보</h1>
        <CheckID />
        <div>
        <h2 style={{fontSize: '16px'}}>메일 수정하기</h2>
        <button 
          onClick={handleButtonClick} 
          style={{
          backgroundColor: '#3498db', // 배경색
          color: 'white',
          width: '100px',
          height: '25px',
          fontSize: '12px',
          border: 'none',
          borderRadius: '6px',
          padding: '0px 0px',}}
        >
          인증하기
        </button>
        </div>
        {showPopup && (
          <div style={popupStyle}>
            <div style={popupContentStyle}>
              <p>여기는 팝업입니다!</p>
              <button onClick={handleClosePopup}>닫기</button>
            </div>
          </div>
        )}
        <MajorSelect />
      </main>
    </div>
  );
};

const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
};

export default MyPageEmailManage;