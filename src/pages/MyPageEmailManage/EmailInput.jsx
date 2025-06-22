import { useState } from "react";

export const EmailInput = () => {
  const [localPart, setLocalPart] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [selected, setSelected] = useState("직접 입력");

  const commonDomains = ["gmail.com", "naver.com", "daum.net", "직접 입력"];

  const handleRequestAuth = async () => {
    const fullEmail = `${localPart}@${selected === "직접 입력" ? customDomain : selected}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");
    if (!emailRegex.test(fullEmail)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }
    // 이메일 인증 요청 보내기
    try {
      const res = await fetch("https://test.smu-notice.kr/api/email/verification/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },

        body: JSON.stringify({ "email": fullEmail }),
        mode: "cors",
        credentials: "include",
      });

      if (!res.ok) throw new Error("인증 코드 발송 실패");

      // 인증번호 입력 팝업
      const popup = window.open("", "emailVerification", "width=400,height=300,left=200,top=200");

      if (popup) {
        popup.document.write(`
          <html>
            <head>
              <title>이메일 인증</title>
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
              <input type="text" id="authInput" placeholder="인증번호 입력" />
              <button id="submitBtn">확인</button>
              <script>
                const token = '${token}';
                document.getElementById('submitBtn').onclick = function() {
                  const code = document.getElementById('authInput').value;
                  if (!code.trim()) {
                    alert('인증번호를 입력해주세요.');
                    return;
                  }
                  fetch('https://test.smu-notice.kr/api/email/verification/verify', {
                    method: 'POST',
                    headers: { 
                      'Content-Type': 'application/json',
                      "Authorization": 'Bearer '+token
                    },
                    body: JSON.stringify({
                      email: '${fullEmail}',
                      verificationCode: code
                    }),
                    credentials: 'include'
                  })
                  .then(res => {
                    if (!res.ok) throw new Error('검증 실패');
                    return res.json();
                  })
                  .then(data => {
                    alert('✅ 인증 성공!');
                    window.close();
                  })
                  .catch(err => {
                    alert('❌ 인증 실패: ' + err.message);
                  });
                };
              </script>
            </body>
          </html>
        `);
      } else {
        alert("팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.");
      }
    } catch (error) {
      alert("❌ 인증 요청 실패: " + error.message);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <input
        type="text"
        value={localPart}
        onChange={(e) => setLocalPart(e.target.value)}
        placeholder="이메일 앞부분"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "200px",
        }}
      />
      <span>@</span>

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

      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          if (e.target.value !== "직접 입력") {
            setCustomDomain("");
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
