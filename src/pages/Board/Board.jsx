import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getSneakyToken } from "../../mocks/getSneakyToken";
import {
  Container,
  Title,
  VerticalDivider,
  Site,
  Line,
  SubLine,
  NoticeContainer,
  NoticeTitle,
  DateAndViews,
  CalendarIcon,
  ViewIcon,
  NoticeContent,
  NoticeOrigin,
  NextNotice,
  BeforeNotice
} from "./BoardStyle";
import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";

const Board = () => {
  const [notice, setNotice] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getSneakyToken("abc@email.com");
      if (!token) {
        console.error("토큰이 없음, 데이터 못 불러옴");
        return;
      }

      try {
        const response = await axios.get(`https://test.smu-notice.kr/api/main/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.data.success) {
          setNotice(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!notice) return <p>존재하지 않는 게시글입니다.</p>;

  return (
    <Container>
      <Title>
        모든공지
        <VerticalDivider />
        <Site>{notice.name}</Site>
      </Title>
      <Line />
      <NoticeContainer>
        <NoticeTitle>{notice.type ? `[${notice.type}]` : ''}{notice.title}</NoticeTitle>
        <DateAndViews>
          <CalendarIcon src={calendarIcon} alt="calendar" />{notice.postedDate}
          <ViewIcon src={viewIcon} alt="view" />{notice.viewCount}
        </DateAndViews>
        <SubLine />
        <NoticeContent>{notice.contentSummary}</NoticeContent>
        <NoticeOrigin href={notice.url} target="_blank" rel="noopener noreferrer">
          ▶ 원문
        </NoticeOrigin>
      </NoticeContainer>
      <Line />
      <BeforeNotice>이전글</BeforeNotice>
      <SubLine />
      <NextNotice>다음글</NextNotice>
      <SubLine />
    </Container>
  );
};

export default Board;
