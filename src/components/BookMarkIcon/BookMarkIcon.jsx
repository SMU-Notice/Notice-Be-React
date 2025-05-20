import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookmarkWrapper,
  BookmarkButton,
  FolderList,
  FolderItem,
  AddFolder,
  FolderInput,
} from "./BookMarkIconStyle";

import {
  addBookmarkToFolder,
  createFolder,
  renameFolder,
  getFolderPosts,
} from "../../utils/bookmarkService";

const BookMarkIcon = ({ isBookmarked, postId }) => {
  const [bookmarkFolders, setBookmarkFolders] = useState([]);
  const [showFolders, setShowFolders] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const getToken = () =>
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  useEffect(() => {
    const fetchFolders = async () => {
      const token = getToken();
      try {
        const response = await axios.get(
          `https://test.smu-notice.kr/api/mypage/bookmark`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setBookmarkFolders(response.data.data);
        } else {
          console.error("폴더 데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("폴더 조회 오류:", error);
      }
    };

    fetchFolders();
  }, []);

  const toggleFolders = () => {
    setShowFolders((prev) => !prev);
    setShowInput(false);
  };

  const handleFolderClick = async (folderId) => {
    if (!postId) {
      alert("게시글 ID가 유효하지 않습니다.");
      return;
    }

    try {
      const { data } = await addBookmarkToFolder(folderId, postId);
      if (data.success) {
        alert("북마크가 폴더에 추가되었습니다.");
        setShowFolders(false);

        await getFolderPosts(folderId); 
      } else {
        alert("북마크 추가 실패: " + data.error);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("이미 북마크된 게시글입니다.");
      } else {
        console.error("북마크 추가 오류:", error);
        alert("북마크 추가 중 오류 발생");
      }
    }
  };

  const handleAddFolderClick = () => setShowInput(true);

  const handleInputChange = (e) => setNewFolderName(e.target.value);

  const handleInputKeyDown = async (e) => {
    if (e.key === "Enter" && newFolderName.trim()) {
      const trimmedName = newFolderName.trim();

      const isDuplicate = bookmarkFolders.some(
        (folder) => folder.name === trimmedName
      );
      if (isDuplicate || trimmedName.length < 1) {
        alert("다른 폴더와 이름이 다르고 한 글자 이상 입력해주세요");
        return;
      }
      
      try {
        // 1. 폴더 생성
        const createRes = await createFolder();
        if (!createRes.data.success) throw new Error(createRes.data.error);
        const newFolder = createRes.data.data;

        // 2. 이름 변경
        const renameRes = await renameFolder(newFolder.id, trimmedName);
        if (!renameRes.data.success) throw new Error(renameRes.data.error);

        // 3. 북마크 추가
        await handleFolderClick(newFolder.id);

        // 4. 폴더 목록 업데이트
        const updatedFolder = { ...newFolder, name: trimmedName };
        setBookmarkFolders((prev) => [...prev, updatedFolder]);
        setNewFolderName("");
        setShowInput(false);
      } catch (error) {
        console.error("폴더 생성 또는 이름 변경 오류:", error);
        alert("폴더 생성 중 오류 발생");
      }
    }
  };

  return (
    <BookmarkWrapper>
      <BookmarkButton onClick={toggleFolders} isBookmarked={isBookmarked}>
        북마크
      </BookmarkButton>
      {showFolders && (
        <FolderList>
          {bookmarkFolders.map((folder) => (
            <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id)}>
              {folder.name}
            </FolderItem>
          ))}
          {!showInput ? (
            <AddFolder onClick={handleAddFolderClick}>+ 폴더 생성 후 추가</AddFolder>
          ) : (
            <FolderInput
              autoFocus
              type="text"
              placeholder="폴더명 입력"
              value={newFolderName}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          )}
        </FolderList>
      )}
    </BookmarkWrapper>
  );
};

export default BookMarkIcon;
