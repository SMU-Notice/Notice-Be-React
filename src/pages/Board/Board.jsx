import { useNavigate, useParams } from "react-router-dom";

const Board = () => {
  const params = useParams();
  const navigate = useNavigate();
  const goTo = () => {
    navigate('/main');
  };

  return (
    <div>
      <h1>Post Page</h1>
      <p>현재 페이지의 파라미터는 { params.post_id } 입니다.</p>
      <button onClick={goTo}>메인 페이지로 이동</button>
    </div>
  );
};

export default Board;