import React, { useEffect, useState, useRef } from "react";
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
  getToken,
  removeBookmarkFromFolder ,
} from "../../utils/bookmarkService";

const BookMarkIcon = ({ isBookmarked , postId }) => {
  const [bookmarkFolders, setBookmarkFolders] = useState([]);
  const [showFolders, setShowFolders] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [foldersWithPost, setFoldersWithPost] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const folderListRef = useRef(null);

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

          const folderCheckPromises = response.data.data.map(async (folder) => {
            const folderPostsData = await getFolderPosts(folder.id);  // returns { name, posts }
            return folderPostsData?.posts?.some((post) => post.id === postId)
              ? folder.id
              : null;
          });

          const folderIdsWithPost = (await Promise.all(folderCheckPromises)).filter(Boolean);
          setFoldersWithPost(folderIdsWithPost);
        } else {
          console.error("폴더 데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("폴더 조회 오류:", error);
      }
    };

    fetchFolders();
  }, [postId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        folderListRef.current &&
        !folderListRef.current.contains(event.target)
      ) {
        setShowFolders(false);
        setShowInput(false);
      }
    };

    if (showFolders) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFolders]);

  const handleFolderClick = async (folderId) => {
    if (!postId) {
      alert("게시글 ID가 유효하지 않습니다.");
      return;
    }
  
    const alreadyBookmarked = foldersWithPost.includes(folderId);
  
    try {
      if (alreadyBookmarked) {
        const res = await removeBookmarkFromFolder(folderId, postId);
        if (res.data.success) {
          alert("북마크가 해제되었습니다.");
          setFoldersWithPost((prev) => {
            const updated = prev.filter((id) => id !== folderId);
            return updated;
          });
        } else {
          alert("북마크 해제 실패: " + res.data.error);
        }
      } else {
        const { data } = await addBookmarkToFolder(folderId, postId);
        if (data.success) {
          alert("북마크가 폴더에 추가되었습니다.");
          setFoldersWithPost((prev) => [...prev, folderId]);
        } else {
          alert("북마크 추가 실패: " + data.error);
        }
      }
  
      setShowFolders(false);
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
      alert("북마크 처리 중 오류 발생");
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
      <BookmarkButton onClick={() => setShowFolders((prev) => !prev)} isBookmarked={isBookmarked}>
        북마크
      </BookmarkButton>
      {showFolders && (
        <FolderList ref={folderListRef}>
          {bookmarkFolders.map((folder) => (
            <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id)}>
              {folder.name}
              {foldersWithPost.includes(folder.id) && " ✔️"}
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
