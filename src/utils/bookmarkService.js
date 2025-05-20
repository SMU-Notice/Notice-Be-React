// utils/bookmarkService.js

import axios from "axios";

const API_BASE_URL = "https://test.smu-notice.kr/api/mypage/bookmark";

// 토큰 획득 함수
const getToken = () =>
  localStorage.getItem("kakaoToken") ||
  localStorage.getItem("naverToken") ||
  localStorage.getItem("googleToken");

// 폴더 생성
export const createFolder = async () => {
  const token = getToken();
  return await axios.post(`${API_BASE_URL}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 폴더 이름 변경
export const renameFolder = async (folderId, newName) => {
  const token = getToken();
  return await axios.patch(
    `${API_BASE_URL}/${folderId}?newName=${encodeURIComponent(newName)}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// 북마크 추가
export const addBookmarkToFolder = async (folderId, postId) => {
  const token = getToken();
  return await axios.post(
    `https://test.smu-notice.kr/api/bookmark/add/${folderId}/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getFolderPosts = async (folderId) => {
    const token = getToken();
    try {
      const res = await axios.get(
        `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (res.data.success) {
        console.log(`📌 폴더 ID ${folderId}의 북마크된 게시글 목록:`, res.data.data);
      } else {
        console.error("폴더 게시글 조회 실패:", res.data.error);
      }
    } catch (err) {
      console.error("폴더 게시글 불러오기 오류:", err);
    }
  };
