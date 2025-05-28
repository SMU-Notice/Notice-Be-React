const SocialGoogle = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // 환경변수에서 클라이언트 ID 불러오기
    //const redirectUri = 'https://preview.smu-notice.kr/auth/google'; // 본인의 구글 리디렉션 URI 설정 에러있음

    // OAuth2 권한 요청 URL
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=824876295333-fqt8ubbttl1k521v5o8vq4sr4nuqob5d.apps.googleusercontent.com&redirect_uri=https://preview.smu-notice.kr/auth/google&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`; // 사용자에게 권한 요청 강제 표시

    const handleLogin = () => {
        window.location.href = googleURL;
    };

    return handleLogin;
};

export default SocialGoogle;
