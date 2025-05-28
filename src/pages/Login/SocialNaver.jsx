const SocialNaver = () => {
    const clientId = 'L2I7YXF1MWWGhM05RZly';
    const redirectUri = 'https://preview.smu-notice.kr/auth/naver';

    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=false`;

   
    const HandleLogin = () => {
        window.location.href = naverURL;
    };
    return HandleLogin;
};

export default SocialNaver;
