import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthKakao = () => {
    const location = useLocation();

    useEffect(() => {
        // location.hash: "#access_token=..."
        const searchParams = new URLSearchParams(location.search); // '?' 포함한 쿼리 파싱
        const accessToken = searchParams.get("code"); // 인가 코드 추출
        const provider = "kakao";

        if (accessToken) {
            getToken(accessToken);
        } else {
            console.error("❌ Kakao access_token이 없습니다.");
        }

        async function getToken(token) {
            try {
                console.log("🟢 Backend에 access token 전달 중:", token);

                const response = await fetch(`https://test.smu-notice.kr/api/auth/login/${provider}?code=${encodeURIComponent(token)}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                });

                if (!response.ok) throw new Error("토큰 요청 실패");

                const data = await response.json();
                console.log("🔑 백엔드 응답:", data.data);

                localStorage.setItem("kakaoToken", data.data);

                window.location.href = "/";
            } catch (error) {
                console.error("❌ 토큰 요청 오류:", error);
            }
        }
    }, [location]);

    return <div>카카오 로그인 중...</div>;
};

export default AuthKakao;
