import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const goTo = () => {
    navigate('/mainpage');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={goTo}>메인 페이지로 이동</button>
    </div>
  );
};

export default Login;