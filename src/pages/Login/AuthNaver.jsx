import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthNaver = () => {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");     // 인가 코드
        const state = searchParams.get("state");   // CSRF 방지용 state
        const provider = "naver";

        if (code) {
            getToken(code, state);
        } else {
            console.error("❌ Naver code가 없습니다.");
        }

        async function getToken(code, state) {
            try {
                console.log("🟢 Backend에 Naver code 전달 중:", code);

                const response = await fetch(`http://localhost:8080/api/auth/login/${provider}?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`, {
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

                localStorage.setItem("naverToken", data.data);

                // window.location.href = "/";
            } catch (error) {
                console.error("❌ 토큰 요청 오류:", error);
            }
        }
    }, [location]);

    return <div>네이버 로그인 중...</div>;
};

export default AuthNaver;
