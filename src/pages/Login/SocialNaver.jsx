const SocialNaver = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = 'http://localhost:5173/auth/naver';

    //const state = "false"; // CSRF 방지용 랜덤 문자열
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=false`;

   
    const HandleLogin = () => {
        window.location.href = naverURL;
    };
    return HandleLogin;
};

export default SocialNaver;
