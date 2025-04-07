export const CheckID = () => {
    const kakaoToken = localStorage.getItem('kakaoToken');
    const naverToken = localStorage.getItem('naverToken');
    const googleToken = localStorage.getItem('googleToken');
  
    const textStyle = {
      fontFamily: "'Arial', sans-serif",  
      fontSize: '16px',                   
      color: '#333',                      
    };
  
    if (kakaoToken) {
      return <div style={textStyle}>로그인 된 소셜 계정 카카오</div>;
    } else if (naverToken) {
      return <div style={textStyle}>로그인 된 소셜 계정 네이버</div>;
    } else if (googleToken) {
      return <div style={textStyle}>로그인 된 소셜 계정 구글</div>;
    } else {
      return <div style={textStyle}>로그인 된 소셜 계정 Error</div>;
    }
  };
  
  export default CheckID;