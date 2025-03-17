import { useNavigate } from "react-router-dom";

const MainBoard = () => {
  const navigate = useNavigate();
  const goTo = () => {
    navigate('/main');
  };

  return (
    <div>
      <h1>MainBoard Page</h1>
      <button onClick={goTo}>메인 페이지로 이동</button>
    </div>
  );
};

export default MainBoard;