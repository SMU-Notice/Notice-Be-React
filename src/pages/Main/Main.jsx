import { useNavigate } from "react-router-dom";
import React from "react";
import { Container, Background, Content, Overlay, Description, StartButton, Navbar, NavButton, SmuNoticeIcon} from './MainStyle';


 const Main = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <Container>
      <Overlay />
      <Background />
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