import { useNavigate } from "react-router-dom";
import { NavButton, Navibar, NavibarTitle, SmuIcon } from './NavBarStyle';
import smuIcon from "../../assets/megaphone.svg"

const NavBarLogined = () => {
    const navigate = useNavigate();
    const goToMainPage = () => {
        navigate('/MainPage');
    };
    const goToMyPageBookMark = () => {
        navigate('/MyPageBookMark');
    };
    const Logout = () => {
        localStorage.removeItem("kakaoToken");
        localStorage.removeItem("naverToken");
        localStorage.removeItem("googleToken");
        
        window.location.href = "/";
    };

    return (
        <Navibar>
        <NavibarTitle onClick={goToMainPage}>
          <SmuIcon src={smuIcon} alt="SMU Icon"/>
          SMU NOTICE
        </NavibarTitle>
        <div>
          <NavButton onClick={goToMyPageBookMark}>마이페이지</NavButton>
          <NavButton onClick={Logout}>로그아웃</NavButton>
        </div>
      </Navibar>
    );
};

export default NavBarLogined;