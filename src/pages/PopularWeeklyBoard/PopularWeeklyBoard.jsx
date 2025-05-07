import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSneakyToken } from "../../mocks/getSneakyToken"
import {Container, Title, NoticeList, NoticeItem, Rank, NoticeText, DateAndViews, NoticeTitle, CalendarIcon, ViewIcon } from "./PopularWeeklyBoardStyle";
import calendarIcon from "../../assets/calendar.svg"
import viewIcon from "../../assets/viewIcon.svg"

const PopularWeeklyBoard = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getSneakyToken("abc@email.com");
      console.log("받은 토큰:", token); // ✅ 토큰 확인
  
      if (!token) {
        console.error("토큰이 없음, 데이터 못 불러옴");
        return;
      }
  
      axios.get("https://test.smu-notice.kr/api/main/top", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        console.log("API 응답 데이터:", response.data); // ✅ 전체 응답 확인
        if (response.data.success) {
          setNotices(response.data.data);
          console.log("설정된 notices:", response.data.data); // ✅ notices 상태에 들어갈 데이터
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
      <Title>이달의 인기글</Title>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.postId} onClick={() => goToBoard(notice.postId)}>
            <Rank first={notice.post_rank === 1}>{notice.post_rank}</Rank>
            <NoticeText>
              <NoticeTitle first={notice.post_rank === 1}>{notice.title}</NoticeTitle>
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

export default PopularWeeklyBoard;
