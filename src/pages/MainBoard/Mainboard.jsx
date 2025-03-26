import React from "react";
import { useNavigate } from "react-router-dom";
import {Container, Title, NoticeList, NoticeItem, Type, NoticeText, DateAndViews, NoticeTitle, CalendarIcon, ViewIcon } from "./MainBoardStyle";
import calendarIcon from "../../assets/calendar.svg"
import viewIcon from "../../assets/viewIcon.svg"

const notices = [
  { post_id: 7, type : "상명", title: "[학생복지팀] 2022학년도 주거래은행 변경에 따른 KB국민카드 학생증 상시 발급안내", posted_date: "2022-08-01", view_count: "1,496,452"},
  { post_id: 6, type : "학과", title: "[학사운영팀] 2025학년도 제1학기 수강신청 안내 및 강의시간표 공지", posted_date: "2025-01-22", view_count: "183,900"},
  { post_id: 5, type : "상명", title: "[학사운영팀/교무팀] 2025학년도 제1학기 K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75,448"},
  { post_id: 4, type : "상명", title: "[취업진로지원팀] 상명대학교 잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70,704"},
  { post_id: 3, type : "상명", title: "[교무처] 2025학년도 제1학기 스마트출결시스템 사용 및 출결관리 안내", posted_date: "2025-02-18", view_count: "48,424"},
  { post_id: 2, type : "상명", title: "[취업진로지원팀] 상명대 대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43,435"},
  { post_id: 1, type : "상명", title: "[학사운영팀] 2025학년도 제1학기 취업계 안내", posted_date: "2025-02-18", view_count: "43,262"}
];


const MainBoard = () => {
  const navigate = useNavigate();
    const goToBoard = (id) => {
      navigate(`/board/${id}`);
    };

  return (
    <Container>
      <Title>모든 공지</Title>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.post_id} onClick={() => goToBoard(notice.post_id)}>
            <Type tpye={notice.type}>{notice.type}</Type>
            <NoticeText>
              <NoticeTitle tpye={notice.tpye}>{notice.title}</NoticeTitle>
              <DateAndViews>
                <CalendarIcon src={calendarIcon} alt="calendarIcon"/>{notice.posted_date}<ViewIcon src={viewIcon} alt="viewIcon"/>{notice.view_count}
              </DateAndViews>
            </NoticeText>
          </NoticeItem>
        ))}
      </NoticeList>
    </Container>
  );
};

export default MainBoard;
