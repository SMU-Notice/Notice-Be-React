import React from "react";
import "./BookMarkPage.css";

const folders = ["★장학금★", "수강신청", "등록", "기타", "+", "★장학금★"];

const BookMarkPage = () => {
  return (
    <div className="bookmark-container">
      <aside className="sidebar">
        <div className="logo">📢 SMU NOTICE</div>
        <nav>
          <ul>
            <li>북마크</li>
            <li>메일 관리</li>
            <li>회원 정보</li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <h1 className="title">북마크 관리</h1>

        <div className="folder-grid">
          {folders.map((name, idx) => (
            <div
              key={idx}
              className={`folder ${name === "+" ? "new-folder" : ""}`}
            >
              {name}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookMarkPage;
