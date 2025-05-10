import naverLoginImg from "../../assets/naverlogin.png";

export const CheckID = () => {
    const kakaoToken = localStorage.getItem('kakaoToken');
    const naverToken = localStorage.getItem('naverToken');
    const googleToken = localStorage.getItem('googleToken');
  
    const textStyle = {
      fontFamily: "'Cafe24Ssurround', sans-serif",  
      fontSize: '16px',                   
      color: '#333',                      
    };
  
    if (kakaoToken) {
      return <div style={textStyle}>로그인 된 소셜 계정 카카오</div>;
    } else if (!naverToken) {
      return <div style={textStyle}>로그인 된 소셜 계정 
      <img
        src={naverLoginImg}
        alt="네이버 로고"
        style={{ width: '24px', height: '24px', marginRight: '3px', verticalAlign: 'middle' }}
      />
    </div>;
    } else if (googleToken) {
      return <div style={textStyle}>로그인 된 소셜 계정 구글</div>;
    } else {
      return <div style={textStyle}>로그인 된 소셜 계정 Error</div>;
    }
  };
  
  export default CheckID;