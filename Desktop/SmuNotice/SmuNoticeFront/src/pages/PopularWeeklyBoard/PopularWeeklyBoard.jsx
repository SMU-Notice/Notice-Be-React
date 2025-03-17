import { useNavigate } from "react-router-dom";

const PopularWeeklyBoard = () => {
  const navigate = useNavigate();
  const goTo = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>PopularWeeklyBoard Page</h1>
      <button onClick={goTo}>메인 페이지로 이동</button>
    </div>
  );
};

export default PopularWeeklyBoard;