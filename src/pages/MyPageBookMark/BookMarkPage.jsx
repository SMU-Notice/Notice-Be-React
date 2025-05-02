import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookMarkPage.css";

const folders = ["★장학금★", "수강신청", "등록", "기타", "+"];

const BookMarkPage = () => {
  const navigate = useNavigate();
  const goToEmailManage = () => navigate('/MyPageEmailManage');
  const goToProfileEdit = () => navigate('/MyPageProfileEdit');

  const [openFolderIndex, setOpenFolderIndex] = useState(null);
  const [folderContents, setFolderContents] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  const handleFolderClick = async (idx) => {
    if (folders[idx] === "+") return;

    if (openFolderIndex === idx) {
      setIsClosing(true);
      setTimeout(() => {
        setOpenFolderIndex(null);
        setIsClosing(false);
      }, 400);
    } else {
      setOpenFolderIndex(idx);
      setIsClosing(false);

      if (!folderContents[idx]) {
        const content = await fetchFolderContent(folders[idx]);
        setFolderContents((prev) => ({ ...prev, [idx]: content }));
      }
    }
  };

  const fetchFolderContent = async (folderName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["파일1.txt", "파일2.pdf", "파일3.docx"]);
      }, 300);
    });
  };

  return (
    <div className="bookmark-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button>북마크</button>
            <button onClick={goToEmailManage}>메일<br />관리</button>
            <button onClick={goToProfileEdit}>회원<br />정보</button>
          </div>
        </nav>
      </aside>

      <div className="main">
        <div className="folder-grid">
          {folders.map((name, idx) => {
            const isOpened = openFolderIndex === idx;
            const isHidden = openFolderIndex !== null && !isOpened;

            return (
              <div
                key={idx}
                className={`folder 
                  ${name === "+" ? "new-folder" : ""}
                  ${isHidden ? "hidden" : ""}
                  ${isOpened ? "fullscreen" : ""}
                  ${openFolderIndex === null && !isClosing ? "fade-in" : ""}
                `}
                onClick={() => handleFolderClick(idx)}
              >
                <div className="folder-label">
                  {isOpened ? folders[openFolderIndex] : name}
                </div>
                {isOpened && (
                  <div className="file-list">
                    {folderContents[openFolderIndex]?.map((file, i) => (
                      <div key={i} className="file-item">📄 {file}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookMarkPage;
