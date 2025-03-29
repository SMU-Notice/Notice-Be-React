const SocialGoogle = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // 환경변수에서 클라이언트 ID 불러오기
    const redirectUri = 'http://localhost:5173/api/auth/login/google'; // 본인의 구글 리디렉션 URI 설정

    // OAuth2 권한 요청 URL
    const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?" +
        `client_id=${googleClientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        "response_type=code&" + // 보안적으로 권장되는 방식
        "scope=email profile&" + // scope 확장 가능
        "access_type=offline&" + // refresh token 발급을 위해 추가
        "prompt=consent"; // 사용자에게 권한 요청 강제 표시

    const handleLogin = () => {
        window.location.href = googleURL;
    };

    return handleLogin;
};

export default SocialGoogle;
