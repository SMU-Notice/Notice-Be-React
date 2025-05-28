const SocialKakao = () => {
    const Rest_api_key = 'da69e4218d5cf9238b970d39dea0bd79'; // 환경 변수에서 가져오기
    const redirect_uri = 'https://preview.smu-notice.kr/auth/kakao'; // Redirect URI 설정

    // OAuth 요청 URL 생성
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const HandleLogin = () => {
        window.location.href = kakaoURL;
    };

    return HandleLogin;
};

export default SocialKakao;
