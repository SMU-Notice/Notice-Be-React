
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./BookMarkPage.css";
// import folderIcon from "../../assets/folder.svg";
// import folderplus from "../../assets/folderplus.svg";

// const MyPageBookMark = () => {
//   const navigate = useNavigate();
//   const [folders, setFolders] = useState([]);
//   const [openFolderIndex, setOpenFolderIndex] = useState(null);
//   const [folderContents, setFolderContents] = useState({});
//   const [isClosing, setIsClosing] = useState(false);

//   const token =
//   localStorage.getItem("kakaoToken") ||
//   localStorage.getItem("naverToken") ||
//   localStorage.getItem("googleToken");

//   const fetchFolders = async () => {
//     try {
//       const res = await fetch("/api/mypage/bookmark", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const result = await res.json();
//       if (result.success) setFolders(result.data);
//     } catch (err) {
//       console.error("폴더 목록 조회 실패:", err);
//     }
//   };

//   const createFolder = async () => {
//     const name = prompt("새 폴더 이름을 입력하세요:");
//     if (!name || name.trim() === "") return;

//     try {
//       const res = await fetch("/api/mypage/bookmark", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         //body: JSON.stringify({ name: name.trim() }),
//       });
//       const result = await res.json();
//       if (result.success) setFolders((prev) => [...prev, result.data]);
//     } catch (err) {
//       console.error("폴더 생성 실패:", err);
//     }
//   };

//   const deleteFolder = async (folderId) => {
//     const confirmed = window.confirm("이 폴더를 삭제하시겠습니까?");
//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/mypage/bookmark/${folderId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       if (result.success) setFolders((prev) => prev.filter((f) => f.id !== folderId));
//     } catch (err) {
//       console.error("폴더 삭제 실패:", err);
//     }
//   };

//   const renameFolder = async (folderId, currentName) => {
//     try {
//       const res = await fetch(`/api/mypage/bookmark/${folderId}?newName=${encodeURIComponent(newName.trim())}`, {
//         method: "PATCH",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       if (result.success) {
//         setFolders((prev) => prev.map((f) => f.id === folderId ? { ...f, name: result.data.name } : f));
//       }
//     } catch (err) {
//       console.error("이름 변경 실패:", err);
//     }
//   };

//   const fetchFolderPosts = async (folderId) => {
//     try {
//       const res = await fetch(`/api/mypage/bookmark/${folderId}/posts`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       return result.success ? result.data : [];
//     } catch (err) {
//       console.error("게시글 조회 실패:", err);
//       return [];
//     }
//   };

//   const handleFolderClick = async (idx) => {
//     if (idx === folders.length) {
//       await createFolder();
//       return;
//     }

//     const selectedFolder = folders[idx];

//     if (openFolderIndex === idx) {
//       setIsClosing(true);
//       setTimeout(() => {
//         setOpenFolderIndex(null);
//         setIsClosing(false);
//       }, 400);
//     } else {
//       setOpenFolderIndex(idx);
//       setIsClosing(false);
//       if (!folderContents[selectedFolder.id]) {
//         const posts = await fetchFolderPosts(selectedFolder.id);
//         setFolderContents((prev) => ({ ...prev, [selectedFolder.id]: posts }));
//       }
//     }
//   };

//   useEffect(() => {
//     fetchFolders();
//   }, []);

//   const goToEmailManage = () => navigate("/MyPageEmailManage");
//   const goToProfileEdit = () => navigate("/MyPageProfileEdit");

//   return (
//     <div className="bookmark-container">
//       <aside className="sidebar">
//         <nav>
//           <div className="sidebar-buttons">
//             <button>북마크</button>
//             <button onClick={goToEmailManage}>메일<br />관리</button>
//             <button onClick={goToProfileEdit}>회원<br />정보</button>
//           </div>
//         </nav>
//       </aside>

//       <div className="main">
//         <h1 className="title">북마크 관리</h1>

//         <div className="folder-grid">
//           {[...folders, { id: "new", name: "+" }].map((folder, idx) => {
//             const isPlus = folder.name === "+";
//             const isOpened = openFolderIndex === idx;
//             const isHidden = openFolderIndex !== null && !isOpened;

//             return (
//               <div
//                 key={folder.id || idx}
//                 className={`folder ${isPlus ? "new-folder" : ""} ${isHidden ? "hidden" : ""} ${isOpened ? "fullscreen" : ""}`}
//                 onClick={() => handleFolderClick(idx)}
//                 onContextMenu={(e) => {
//                   e.preventDefault();
//                   if (!isPlus) {
//                     const menu = window.confirm("이름을 변경하시겠습니까? 취소를 누르면 삭제합니다.");
//                     if (menu) renameFolder(folder.id, folder.name);
//                     else deleteFolder(folder.id);
//                   }
//                 }}
//                 style={
//                   isOpened && !isPlus ? {
//                     backgroundImage: `url(${folderIcon})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat'
//                   } : {}
//                 }
//               >
//                 {!isOpened ? (
//                   <>
//                     <img
//                       src={isPlus ? folderplus : folderIcon}
//                       alt="폴더 아이콘"
//                       className="folder-icon"
//                     />
//                     <div className="folder-label">{isPlus ? "" : folder.name}</div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="folder-label fullscreen-label">{folder.name}</div>
//                     <div className="file-list">
//                       {folderContents[folder.id]?.map((file) => (
//                         <div key={file.id} className="file-item">
//                           📄 {file.title}
//                         </div>
//                       )) || <div>게시글이 없습니다.</div>}
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyPageBookMark;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookMarkPage.css";
import folderIcon from "../../assets/folder.svg";
import folderplus from "../../assets/folderplus.svg";

const MyPageBookMark = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [openFolderIndex, setOpenFolderIndex] = useState(null);
  const [folderContents, setFolderContents] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  const fetchFolders = async () => {
    try {
      const res = await fetch("/api/mypage/bookmark", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) setFolders(result.data);
    } catch (err) {
      console.error("폴더 목록 조회 실패:", err);
    }
  };

  const createFolder = async () => {
    try {
      const res = await fetch("/api/mypage/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) setFolders((prev) => [...prev, result.data]);
    } catch (err) {
      console.error("폴더 생성 실패:", err);
    }
  };

  const deleteFolder = async (folderId) => {
    const confirmed = window.confirm("이 폴더를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/mypage/bookmark/${folderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success)
        setFolders((prev) => prev.filter((f) => f.id !== folderId));
    } catch (err) {
      console.error("폴더 삭제 실패:", err);
    }
  };

  const renameFolder = async (folderId, currentName) => {
    const newName = prompt("새 이름을 입력하세요:", currentName);
    if (!newName || newName.trim() === "" || newName === currentName) return;

    try {
      const res = await fetch(
        `/api/mypage/bookmark/${folderId}?newName=${encodeURIComponent(newName.trim())}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      if (result.success) {
        setFolders((prev) =>
          prev.map((f) =>
            f.id === folderId ? { ...f, name: result.data.name } : f
          )
        );
      }
    } catch (err) {
      console.error("이름 변경 실패:", err);
    }
  };

  const fetchFolderPosts = async (folderId) => {
    try {
      const res = await fetch(`/api/mypage/bookmark/${folderId}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success && result.data && Array.isArray(result.data.posts)) {
        return result.data;
      } else {
        console.warn("게시글 데이터가 배열이 아님:", result.data);
        return { posts: [] };
      }
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      return [];
    }
  };

  const handleFolderClick = async (idx) => {
    if (idx === folders.length) {
      await createFolder();
      return;
    }

    const selectedFolder = folders[idx];

    if (openFolderIndex === idx) {
      setIsClosing(true);
      setTimeout(() => {
        setOpenFolderIndex(null);
        setIsClosing(false);
      }, 400);
    } else {
      setOpenFolderIndex(idx);
      setIsClosing(false);
      if (!folderContents[selectedFolder.id]) {
        const posts = await fetchFolderPosts(selectedFolder.id);
        setFolderContents((prev) => ({
          ...prev,
          [selectedFolder.id]: posts,
        }));
      }
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const goToEmailManage = () => navigate("/MyPageEmailManage");
  const goToProfileEdit = () => navigate("/MyPageProfileEdit");
  
  console.log("폴더 컨텐츠:", folderContents);
  return (
    <div className="bookmark-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button type="button">북마크</button>
            <button type="button" onClick={goToEmailManage}>
              메일<br />관리
            </button>
            <button type="button" onClick={goToProfileEdit}>
              회원<br />정보
            </button>
          </div>
        </nav>
      </aside>

      <div className="main">
        <h1 className="title">북마크 관리</h1>

        <div className="folder-grid">
          {[...folders, { id: "new", name: "+" }].map((folder, idx) => {
            const isPlus = folder.name === "+";
            const isOpened = openFolderIndex === idx;
            const isHidden = openFolderIndex !== null && !isOpened;
            return (
              <div
                key={folder.id || idx}
                className={`folder ${isPlus ? "new-folder" : ""} ${isHidden ? "hidden" : ""} ${isOpened ? "fullscreen" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFolderClick(idx);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (!isPlus) {
                    const menu = window.confirm("이름을 변경하시겠습니까? 취소를 누르면 삭제합니다.");
                    if (menu) renameFolder(folder.id, folder.name);
                    else deleteFolder(folder.id);
                  }
                }}
                style={
                  isOpened && !isPlus
                    ? {
                        backgroundImage: `url(${folderIcon})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
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
                    <div className="folder-label">{isPlus ? "" : folder.name}</div>
                  </>
                ) : (
                  <>
                    <div className="folder-label fullscreen-label">{folder.name}</div>
                    <div className="file-list">
                      {Array.isArray(folderContents[folder.id]?.posts) &&
                      folderContents[folder.id].posts.length > 0 ? (
                        folderContents[folder.id].posts.map((file) => (
                          <div key={file.id} className="file-item">
                            📄 {file.title}
                          </div>
                        ))
                      ) : (
                        <div>게시글이 없습니다.</div>
                      )}
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

export default MyPageBookMark;
