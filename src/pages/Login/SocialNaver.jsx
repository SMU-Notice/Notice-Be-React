const SocialNaver = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = 'http://localhost:5173/api/auth/login/naver';

    const state = Math.random().toString(36).substring(2, 15); // CSRF 방지용 랜덤 문자열
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

   
    const HandleLogin = () => {
        window.location.href = naverURL;
    };
    return HandleLogin;
};

export default SocialNaver;
