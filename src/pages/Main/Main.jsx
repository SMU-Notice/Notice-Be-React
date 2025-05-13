import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Container,
  Background,
  Content,
  Overlay,
  Description,
  StartButton,
} from './MainStyle';

import bg from "../../assets/backgroundimg.svg";
import bg1 from "../../assets/backgroundimg1.svg";
import bg2 from "../../assets/backgroundimg2.svg";
import bg3 from "../../assets/backgroundimg3.svg";
import bg4 from "../../assets/backgroundimg4.svg";
import bg5 from "../../assets/backgroundimg5.svg";
import bg6 from "../../assets/backgroundimg6.svg";

const images = [bg, bg1, bg2, bg3, bg4, bg5, bg6];

const Main = ({
  buttonText = "시작하기",
  navigateTo = "/Login",
  descriptionText = `상명대학교 관련 여러 사이트의 공지사항을 한 번에 보고\n관심 있는 글에 대한 메일 알림도 받아볼 수 있습니다.`
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(navigateTo);
  };

  return (
    <Container>
      <Overlay />
      <Background image={images[currentBgIndex]} />
      <Content>
        <Description>
          {descriptionText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Description>
        <StartButton onClick={handleButtonClick}>{buttonText}</StartButton>
      </Content>
    </Container>
  );
};

Main.propTypes = {
  buttonText: PropTypes.string,
  navigateTo: PropTypes.string,
  descriptionText: PropTypes.string,
};

export default Main;
