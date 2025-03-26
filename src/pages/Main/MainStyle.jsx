import styled from 'styled-components';
import backgroundImg from "../../assets/backgroundimg.svg"
import smuIcon from "../../assets/megaphone.svg"

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  position: absolute;
  inset: 0; /* top, right, bottom, left = 0 */
  background-image: url(${backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: white;
  opacity: 0.3;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
`;

const Description = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #09144D;
`;

const StartButton = styled.button`
  margin-top: 1.5rem;
  padding: 10px 20px;
  background: #09144D;
  color: white;
  transition: font-size 0.2s ease-in-out;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    font-size: 1.6rem;
  }  
`;

const Navbar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background: #09144D;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 1;
`;

const NavButton = styled.button`
  background: none;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SmuNoticeIcon = styled.img`
  src: url(${smuIcon});
  width: 24px;
  height: 24px;
  marginRight: 8px; 
`

export {Container, Background, Overlay, Content, Description, StartButton, Navbar, NavButton, SmuNoticeIcon};
