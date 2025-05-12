import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthGoogle = () => {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        const provider = "google";
    
        if (code) {
            getToken(code);
        } else {
            console.error("❌ 구글 인가 코드(code)가 없습니다.");
        }

        async function getToken(token) {
            try {
                console.log("🟢 Backend에 access token 전달 중:", token);

                const response = await fetch(`https://test.smu-notice.kr/api/auth/login/google?code=${encodeURIComponent(token)}`, {
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

                localStorage.setItem("googleToken", data.data);

                window.location.href = "/";
            } catch (error) {
                console.error("❌ 토큰 요청 오류:", error);
            }
        }
    }, [location]);

    return <div>구글 로그인 중...</div>;
};

export default AuthGoogle;