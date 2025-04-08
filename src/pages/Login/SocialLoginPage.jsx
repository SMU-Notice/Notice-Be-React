import React from "react";
import "./SocialLoginPage.css";

const SocialLoginPage = ({ onKakaoLogin, onNaverLogin, onGoogleLogin }) => {
  return (
    <div className="login-container">
      {/* 중앙 안내문과 버튼 */}
      <div className="login-box">
        <h2>소셜 계정을 통해 회원가입 및 로그인을 진행해주세요.</h2>

        <button className="login-button kakao" onClick={onKakaoLogin}>
          💬 카카오톡으로 계속하기
        </button>
        <button className="login-button naver" onClick={onNaverLogin}>
          🟩 네이버로 계속하기
        </button>
        <button className="login-button google" onClick={onGoogleLogin}>
          🔍 구글로 계속하기
        </button>
      </div>
    </div>
  );
};

export default SocialLoginPage;
