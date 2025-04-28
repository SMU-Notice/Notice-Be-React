import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookMarkPage.css";

const folders = ["★장학금★", "수강신청", "등록", "기타", "+"];

const BookMarkPage = () => {
  const navigate = useNavigate();
  const goToEmailManage = () => {
    navigate('/MyPageEmailManage');
  };
  const goToProfileEdit = () => {
    navigate('/MyPageProfileEdit');
  };
  const [openFolderIndex, setOpenFolderIndex] = useState(null);
  const [folderContents, setFolderContents] = useState({});

  const handleFolderClick = async (idx) => {
    if (folders[idx] === "+") {
      return;
    }

    if (openFolderIndex === idx) {
      setOpenFolderIndex(null);
    } else {
      setOpenFolderIndex(idx);

      if (!folderContents[idx]) {
        const content = await fetchFolderContent(folders[idx]);
        setFolderContents((prev) => ({ ...prev, [idx]: content }));
      }
    }
  };

  const fetchFolderContent = async (folderName) => {
    // 실제 백엔드 API 호출로 교체하면 됨
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["파일1.txt", "파일2.pdf", "파일3.docx"]);
      }, 300);
    });
  };

  return (
    <div className="bookmark-container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button>북마크</button>
            <button onClick={goToEmailManage}>메일<br/>관리</button>
            <button onClick={goToProfileEdit}>회원<br/>정보</button>
          </div>
        </nav>
      </aside>

      {/* 메인 */}
      <div className="main">
        {openFolderIndex === null ? (
          <div className="folder-grid">
            {folders.map((name, idx) => (
              <div
                key={idx}
                className={`folder ${name === "+" ? "new-folder" : ""}`}
                onClick={() => handleFolderClick(idx)}
              >
                {name}
              </div>
            ))}
          </div>
        ) : (
          <div className="folder-grid">
            {folders.map((name, idx) => (
              <div
                key={idx}
                className={`folder 
                  ${name === "+" ? "new-folder" : ""}
                  ${openFolderIndex !== null && openFolderIndex !== idx ? "hidden" : ""}
                  ${openFolderIndex === idx ? "opened" : ""}
                `}
                onClick={() => handleFolderClick(idx)}
              >
                <h2 className="opened-folder-title">{folders[openFolderIndex]}</h2>
                {folderContents[openFolderIndex] && (
                  <div className="file-list">
                    {folderContents[openFolderIndex].map((file, i) => (
                      <div key={i} className="file-item">📄 {file}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMarkPage;
