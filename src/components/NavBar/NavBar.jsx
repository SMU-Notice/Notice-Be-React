import { useNavigate } from "react-router-dom";
import { NavButton, Navibar, NavibarTitle, SmuIcon } from './NavBarStyle';
import smuIcon from "../../assets/megaphone.svg"

const Navbar = () => {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate('/');
    };
    const goToLogin = () => {
      navigate('/Login');
    };
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
      
      navigate('/');  //다른 코드도 이걸로 변경
    };

    const getToken = () => {
      return (
        localStorage.getItem("kakaoToken") ||
        localStorage.getItem("naverToken") ||
        localStorage.getItem("googleToken")
      );
    };
    
    const isLoggedIn = () => !!getToken();

    return (
        <Navibar>
        <NavibarTitle onClick={() => {
          if (isLoggedIn()) {
            goToMainPage();
          } else {
            goToMain();
          }
        }}>
          <SmuIcon src={smuIcon} alt="SMU Icon"/>
          SMU NOTICE
        </NavibarTitle>
        <div>
        {isLoggedIn() ? (
        <>
          <NavButton onClick={goToMyPageBookMark}>마이페이지</NavButton>
          <NavButton onClick={Logout}>로그아웃</NavButton>
        </>
        ) : (
        <NavButton onClick={goToLogin}>로그인</NavButton>
        )}
        </div>
        </Navibar>
    );
};

export default Navbar;