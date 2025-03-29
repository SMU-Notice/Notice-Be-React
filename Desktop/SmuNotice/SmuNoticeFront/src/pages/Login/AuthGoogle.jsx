import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthGoogle = () => {
    const location = useLocation();

    useEffect(() => {
        // location.hash: "#access_token=..."
        const hashParams = new URLSearchParams(location.hash.substring(1)); // '#' 제거 후 파싱
        const accessToken = hashParams.get("access_token");
        const provider = "google";

        if (accessToken) {
            getToken(accessToken);
        } else {
            console.error("❌ 구글 access_token이 없습니다.");
        }

        async function getToken(token) {
            try {
                console.log("🟢 Backend에 access token 전달 중:", token);

                const response = await fetch(`http://localhost:8080/api/auth/login/${provider}?code=${encodeURIComponent(token)}`, {
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
