import React, { useEffect } from "react";

const AuthKakaoLogout = () => {
    const kakaoToken = localStorage.getItem("kakaoToken"); // ✅ localStorage 사용
    const provider = "kakao";

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/logout/${provider}Authorization : "Bearer ${kakaoToken}"`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                });

                if (!response.ok) throw new Error("로그아웃 실패");

                // ✅ 토큰 삭제
                localStorage.removeItem("kakaoToken");

                // ✅ 홈으로 리디렉트
                window.location.href = "/";
            } catch (error) {
                console.error("❌ 로그아웃 실패:", error);
            }
        };

        // ✅ 토큰이 있을 때만 실행
        if (kakaoToken) {
            getToken();
        } else {
            console.error("❌ 로그아웃 실패: 저장된 토큰 없음");
            window.location.href = "/"; // 토큰이 없으면 홈으로 이동
        }
    }, [kakaoToken]);

    return <div>Logging out...</div>;
};

export default AuthKakaoLogout;
