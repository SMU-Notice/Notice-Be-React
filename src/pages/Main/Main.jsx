import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Background, Content, Overlay, Description, StartButton, Navbar, NavButton, SmuNoticeIcon} from './MainStyle';

import bg from "../../assets/backgroundimg.svg";
import bg1 from "../../assets/backgroundimg1.svg";
import bg2 from "../../assets/backgroundimg2.svg";
import bg3 from "../../assets/backgroundimg3.svg";
import bg4 from "../../assets/backgroundimg4.svg";
import bg5 from "../../assets/backgroundimg5.svg";
import bg6 from "../../assets/backgroundimg6.svg";

const images = [bg, bg1, bg2, bg3, bg4, bg5, bg6];

 const Main = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2800); // 2.8초마다 변경
    return () => clearInterval(interval); // cleanup
  }, []);

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <Container>
      <Overlay />
      <Background image={images[currentBgIndex]} />
      <Content>
        <Description>
          상명대학교 통합공지와 학과공지를 한 번에 보고
          <br /> 관심 있는 글에 대한 메일 알림도 받아볼 수 있습니다.
        </Description>
        <StartButton onClick={goToLogin}>시작하기</StartButton>
      </Content>
    </Container>
  );
  };

export default Main;