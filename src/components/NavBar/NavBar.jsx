import { useNavigate } from "react-router-dom";
import { NavButton, Navibar, NavibarTitle, SmuIcon } from './NavBarStyle';
import smuIcon from "../../assets/megaphone.svg"

const Navbar = () => {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate('/');
    };
    const goToMypage = () => {
        navigate('/Mypage');
      };
      const goToLogin = () => {
        navigate('/Login');
      };

    return (
        <Navibar>
        <NavibarTitle onClick={goToMain}>
          <SmuIcon src={smuIcon} alt="SMU Icon"/>
          SMU NOTICE
        </NavibarTitle>
        <div>
          <NavButton onClick={goToMypage}>마이페이지</NavButton>
          <NavButton onClick={goToLogin}>로그인</NavButton>
        </div>
      </Navibar>
    );
};

export default Navbar;