import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthKakao = () => {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const accessToken = searchParams.get("code");
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

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const AuthKakao = () => {
//   const location = useLocation();
//   const [status, setStatus] = useState("로그인 처리 중...");

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const authCode = searchParams.get("code");

//     if (authCode) {
//       sendSneakyLogin("abc@email.com"); // 요청하신 하드코딩된 이메일
//     } else {
//       console.error("❌ 인가 코드 없음");
//       setStatus("로그인 실패: 인가 코드 없음");
//     }
//   }, [location]);

//   const sendSneakyLogin = async (email) => {
//     try {
//       const response = await fetch("https://test.smu-notice.kr/api/auth/sneaky/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       })

//       if (!response.ok) throw new Error("sneaky 로그인 실패");

//       const result = response.headers.get("Authorization");
//       const token = result?.replace(/^Bearer\s+/i, ""); // "Bearer " 제거
//       console.log("sneaky 응답:", result);
//       setStatus(" sneaky 로그인 성공");
//       window.location.href = "/";
//       localStorage.setItem("kakaoToken", token);
//     } catch (error) {
//       console.error(" sneaky 로그인 오류:", error);
//       setStatus("로그인 실패");
//     }
//   };

//   return <div>{status}</div>;
// };

// export default AuthKakao;
