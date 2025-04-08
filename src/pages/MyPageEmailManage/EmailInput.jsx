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

    console.log("입력된 이메일:", fullEmail);
    alert(`입력된 이메일: ${fullEmail}`);
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
