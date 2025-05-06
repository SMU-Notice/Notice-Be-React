import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookMarkPage.css";
import folderIcon from "../../assets/folder.svg";
import folderplus from "../../assets/folderplus.svg";

const initialFolders = ["★장학금★", "수강신청", "등록", "기타"];

const BookMarkPage = () => {
  const navigate = useNavigate();
  const goToEmailManage = () => navigate('/MyPageEmailManage');
  const goToProfileEdit = () => navigate('/MyPageProfileEdit');

  const [folders, setFolders] = useState(initialFolders);
  const [openFolderIndex, setOpenFolderIndex] = useState(null);
  const [folderContents, setFolderContents] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  const handleFolderClick = async (idx) => {
    // 마지막 "+" 버튼 처리
    if (idx === folders.length) {
      const newName = prompt("새 폴더 이름을 입력하세요:");
      if (newName && newName.trim() !== "") {
        setFolders([...folders, newName.trim()]);
      }
      return;
    }

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
        <h1 className="title">북마크 관리</h1>

        <div className="folder-grid">
          {[...folders, "+"].map((name, idx) => {
            const isPlus = name === "+";
            const isOpened = openFolderIndex === idx;
            const isHidden = openFolderIndex !== null && !isOpened;

            return (
              <div
                key={idx}
                className={`folder 
                  ${isPlus ? "new-folder" : ""}
                  ${isHidden ? "hidden" : ""}
                  ${isOpened ? "fullscreen" : ""}
                  ${openFolderIndex === null && !isClosing ? "fade-in" : ""}
                `}
                onClick={() => handleFolderClick(idx)}
                style={
                  isOpened && !isPlus
                    ? {
                        backgroundImage: `url(${folderIcon})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }
                    : {}
                }
              >
                {!isOpened ? (
                  <>
                    <img
                      src={isPlus ? folderplus : folderIcon}
                      alt="폴더 아이콘"
                      className="folder-icon"
                    />
                    <div className="folder-label">{isPlus ? "" : name}</div>
                  </>
                ) : (
                  <>
                    <div className="folder-label fullscreen-label">{folders[openFolderIndex]}</div>
                    <div className="file-list">
                      {folderContents[openFolderIndex]?.map((file, i) => (
                        <div key={i} className="file-item">📄 {file}</div>
                      ))}
                    </div>
                  </>
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
