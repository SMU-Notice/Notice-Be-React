import { useState } from "react";

export const EmailInput = () => {
  const [localPart, setLocalPart] = useState("");
  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [selected, setSelected] = useState("직접 입력");

  const commonDomains = ["gmail.com", "naver.com", "daum.net", "직접 입력"];

  const handleRequestAuth = () => {
    const fullEmail = `${localPart}@${selected === "직접 입력" ? customDomain : selected}`;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fullEmail)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }
    
  // 새 창 열기
  const popup = window.open(
    "", // 빈 페이지
    "emailVerification",
    "width=400,height=300,left=200,top=200"
  );

  if (popup) {
    popup.document.write(`
      <html>
        <head>
          <title>인증번호 입력</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            input {
              padding: 8px;
              width: 100%;
              margin-top: 10px;
              font-size: 16px;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
            button {
              margin-top: 12px;
              padding: 10px 16px;
              background-color: #1b1d4d;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 15px;
            }
          </style>
        </head>
        <body>
          <h2>이메일 인증</h2>
          <p>보내드린 인증번호를 입력해주세요:</p>
          <input type="text" placeholder="인증번호 입력" id="authInput"/>
          <button onclick="window.alert('인증번호가 확인되었습니다!'); window.close();">확인</button>
        </body>
      </html>
    `);
  }

  // 실제 이메일 보내기
  verifyEmail(fullEmail);


    async function verifyEmail(token) {
      try {
          console.log("🟢 Backend에 이메일 전달 중:", token);

          const response = await fetch(`https://test.smu-notice.kr/api/email/verification/send`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ fullEmail }),
              mode: "cors",
              credentials: "include",
          });

          if (!response.ok) throw new Error("요청 실패");

          const data = await response.json();
          console.log("🔑 백엔드 응답:", data.data);
      } catch (error) {
          console.error("❌ 토큰 요청 오류:", error);
      }
  }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      {/* 로컬 파트 입력 */}
      <input
        type="text"
        value={localPart}
        onChange={(e) => setLocalPart(e.target.value)}
        placeholder="변경할 메일을 입력해주세요."
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "200px",
        }}
      />
      <span>@</span>

      {/* 도메인 입력 */}
      {selected === "직접 입력" ? (
        <input
          type="text"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          placeholder="직접 입력"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
          }}
        />
      ) : (
        <input
          type="text"
          value={selected}
          disabled
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f2f2f2",
            width: "200px",
          }}
        />
      )}

      {/* 셀렉트 박스 */}
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          if (e.target.value !== "직접 입력") {
            setCustomDomain(""); // 초기화
          }
        }}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {commonDomains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>

      {/* 인증 버튼 */}
      <button
        onClick={handleRequestAuth}
        style={{
          padding: "8px 16px",
          backgroundColor: "#0c114b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        인증번호 받기
      </button>
    </div>
  );
};

export default EmailInput;
