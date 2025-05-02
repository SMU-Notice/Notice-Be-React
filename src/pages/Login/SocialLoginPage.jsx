import React from "react";
import "./SocialLoginPage.css";
import googleLoginImg from "../../assets/googlelogin.svg";
import naverLoginImg from "../../assets/naverlogin.png";
import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";

const SocialLoginPage = ({ onKakaoLogin, onNaverLogin, onGoogleLogin }) => {
  return (
    <div className="login-container">
      {/* 중앙 안내문과 버튼 */}
      <div className="login-box">
        <h2>안녕하세요!<br />소셜 계정을 통해 진행해주세요.</h2>

        <button className="login-button google-img-button" onClick={onKakaoLogin}>
          <img src={kakaoLoginImg} />
        </button>
        <button className="login-button naver" onClick={onNaverLogin}>
          <img
            src={naverLoginImg}
            alt="네이버 로고"
            style={{ width: '50px', height: '50px', marginRight: '3px', verticalAlign: 'middle' }}
          />
          네이버로 계속하기
        </button>
        <button className="login-button google" onClick={onGoogleLogin}>
          <img src={googleLoginImg} />
        </button>
      </div>
    </div>
  );
};

export default SocialLoginPage;
