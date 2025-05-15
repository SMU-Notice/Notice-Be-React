import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TitleWrapper,
  Title,
  MoreButton,
  NoticeList,
  NoticeItem,
  Type,
  NoticeText,
  DateAndViews,
  NoticeTitleText,
  NoticeTitleWrapper,
  CalendarIcon,
  ViewIcon,
  PostedTodayIcon,
  StyledBookMarkIcon
} from "./MainBoardStyle";

import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";
import postedTodayIcon from "../../assets/postedtodayicon.svg"

const siteNameMap = {
  '통합공지': '통합',
  '컴퓨터과학과': '컴과',
  '학술정보관': '학술',
  '대학일자리센터': '일자리',
  'SW중심대학사업단': 'SW',
  'International Student': '국제',
  '학생생활관': '학생',
  '대학원': '대학원',
  '공학교육인증센터': '공학'
};

const MainBoard = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  const token =
  localStorage.getItem("kakaoToken") ||
  localStorage.getItem("naverToken") ||
  localStorage.getItem("googleToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://test.smu-notice.kr/api/main/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.data.success) {
          setNotices(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
  
    fetchData();
  }, [token]);
  

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };

  const goToMainBoardDetail = () => {
    navigate(`/MainBoardDetail`);
  };


  return (
    <Container>
      <TitleWrapper>
        <div style={{ width: "70px" }} /> {/* 왼쪽 공간 맞춤용 */}
        <Title>모든 공지</Title>
        <MoreButton onClick={goToMainBoardDetail}>더보기</MoreButton>
      </TitleWrapper>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.id} onClick={() => goToBoard(notice.id)}>
            <Type noticeType={notice.boardName}>{siteNameMap[notice.boardName] || notice.boardName}</Type>
            <NoticeText>
            <NoticeTitleWrapper>
            <NoticeTitleText>
            {notice.postType ? `[${notice.postType}]` : ''}{notice.title}
            </NoticeTitleText>
            {notice.isPostedToday && (
            <PostedTodayIcon src={postedTodayIcon} alt="postedTodayIcon" />)}
            </NoticeTitleWrapper>
              <DateAndViews>
                <CalendarIcon src={calendarIcon} alt="calendarIcon" />
                {notice.postedDate}
                <ViewIcon src={viewIcon} alt="viewIcon" />
                {Number(notice.viewCount).toLocaleString()}
                <StyledBookMarkIcon isBookmarked={notice.isBookmarked} />
              </DateAndViews>
            </NoticeText>
          </NoticeItem>
        ))}
      </NoticeList>
    </Container>
  );
};

export default MainBoard;
