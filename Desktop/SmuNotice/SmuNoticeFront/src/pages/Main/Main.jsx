import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const goTo = () => {
    navigate('/Login');
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={goTo}>로그인인 페이지로 이동</button>
    </div>
  );
};

export default Main;