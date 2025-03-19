import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/Main');
  };
  const goToSignUp = () => {
    navigate('/SignUp');
  };
  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <div>
      
      <button onClick={goToMain}>SMU NOTICE</button>
      <button onClick={goToSignUp}>로그인인 페이지로 이동</button>
      <button onClick={goToLogin}>로그인인 페이지로 이동</button>
    </div>
  );
  };

export default Main;