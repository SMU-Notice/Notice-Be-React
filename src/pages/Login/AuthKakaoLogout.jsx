import React, { useEffect } from "react";

const AuthKakaoLogout = () => {
    const kakaoToken = localStorage.getItem("kakaoToken"); // ✅ localStorage에서 토큰 가져오기
    const provider = "kakao";

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await fetch(`https://test.smu-notice.kr/api/auth/logout/${provider}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${kakaoToken}`, // ✅ 헤더에 Authorization 추가
                    },
                    mode: "cors",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("로그아웃 실패");
                }

                // ✅ 토큰 삭제
                localStorage.removeItem("kakaoToken");

                // ✅ 홈으로 리디렉션
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
            window.location.href = "/";
        }
    }, [kakaoToken]);

    return <div>Logging out...</div>;
};

export default AuthKakaoLogout;
