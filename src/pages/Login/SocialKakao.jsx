const SocialKakao = () => {
    const Rest_api_key = import.meta.env.VITE_KAKAO_JS_KEY; // 환경 변수에서 가져오기
    const redirect_uri = 'http://localhost:5173/auth/kakao'; // Redirect URI 설정

    // OAuth 요청 URL 생성
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const HandleLogin = () => {
        window.location.href = kakaoURL;
    };

    return HandleLogin;
};

export default SocialKakao;
