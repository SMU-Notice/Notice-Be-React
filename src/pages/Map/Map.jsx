// BookmarkComponent.jsx
import React, { useState } from "react";
import styled from "styled-components";

const BookmarkWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BookmarkButton = styled.div`
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
`;

const FolderList = styled.div`
  position: absolute;
  top: 40px;
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const FolderItem = styled.div`
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AddFolder = styled.div`
  margin-top: 8px;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const FolderInput = styled.input`
  margin-top: 8px;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
`;

const Map = () => {
  const [showFolders, setShowFolders] = useState(false);
  const [folders, setFolders] = useState(["폴더1", "폴더2"]);
  const [showInput, setShowInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const toggleFolders = () => {
    setShowFolders((prev) => !prev);
    setShowInput(false);
  };

  const handleFolderClick = (folderName) => {
    alert(`'${folderName}' 폴더에 북마크가 추가되었습니다.`);
    setShowFolders(false);
  };

  const handleAddFolderClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && newFolderName.trim()) {
      setFolders((prev) => [...prev, newFolderName.trim()]);
      alert(`'${newFolderName.trim()}' 폴더에 북마크가 추가되었습니다.`);
      setNewFolderName("");
      setShowInput(false);
      setShowFolders(false);
    }
  };

  return (
    <BookmarkWrapper>
      <BookmarkButton onClick={toggleFolders}>북마크</BookmarkButton>
      {showFolders && (
        <FolderList>
          {folders.map((folder, index) => (
            <FolderItem key={index} onClick={() => handleFolderClick(folder)}>
              {folder}
            </FolderItem>
          ))}
          {!showInput ? (
            <AddFolder onClick={handleAddFolderClick}>폴더 생성 후 추가</AddFolder>
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

export default Map;
