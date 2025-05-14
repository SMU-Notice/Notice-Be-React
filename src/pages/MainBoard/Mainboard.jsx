import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSneakyToken } from "../../mocks/getSneakyToken"
import {
  Container,
  Title,
  NoticeList,
  NoticeItem,
  Type,
  NoticeText,
  DateAndViews,
  NoticeTitle,
  CalendarIcon,
  ViewIcon,
} from "./MainBoardStyle";

import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('googleToken');
      if (!token) {
        console.error("토큰이 없음, 데이터 못 불러옴");
        return;
      }

      axios.get("https://test.smu-notice.kr/api/main/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        if (response.data.success) {
          setNotices(response.data.data);
        } else {
          console.error("데이터 오류:", response.data.error);
        }
      })
      .catch(error => {
        console.error("API 호출 오류:", error);
      });
    };
  
    fetchData();
  }, []);

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };
  

  return (
    <Container>
      <Title>모든 공지</Title>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.id} onClick={() => goToBoard(notice.id)}>
            <Type noticeType={notice.boardName}>{siteNameMap[notice.boardName] || notice.boardName}</Type>
            <NoticeText>
              <NoticeTitle type={notice.boardName}>{notice.postType ? `[${notice.postType}]` : ''}{notice.title}</NoticeTitle>
              <DateAndViews>
                <CalendarIcon src={calendarIcon} alt="calendarIcon" />
                {notice.postedDate}
                <ViewIcon src={viewIcon} alt="viewIcon" />
                {Number(notice.viewCount).toLocaleString()}
              </DateAndViews>
            </NoticeText>
          </NoticeItem>
        ))}
      </NoticeList>
    </Container>
  );
};

export default MainBoard;
