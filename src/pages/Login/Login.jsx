//import { useNavigate } from "react-router-dom";
import SocialLoginPage from "./SocialLoginPage";
import SocialKakao from "./SocialKakao";
//import SocialNaver from "./SocialNaver";
import SocialGoogle from "./SocialGoogle";

const Login = () => {
  const handleKakao = SocialKakao();
  //const handleNaver = SocialNaver();
  const handleGoogle = SocialGoogle();

  return (
    <SocialLoginPage
      onKakaoLogin={handleKakao}
      onNaverLogin={handleKakao}
      onGoogleLogin={handleGoogle}
    />
  );
};

export default Login;