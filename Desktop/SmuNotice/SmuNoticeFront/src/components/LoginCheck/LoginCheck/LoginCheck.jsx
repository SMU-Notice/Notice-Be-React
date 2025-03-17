import { useEffect } from 'react';

import useUser from 'hooks/useUser';
import { useNavigate } from 'react-router-dom';

const LoginCheck = ({ children }) => {
  const navigate = useNavigate();
  const { isLogin } = useUser();
  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다');
      navigate('/login');
    }
  });
  return <>{isLogin && children}</>;
};

export default LoginCheck;
