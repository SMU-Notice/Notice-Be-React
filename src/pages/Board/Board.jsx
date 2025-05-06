import { useParams } from "react-router-dom";
import styled from "styled-components";

import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";

const Container = styled.div`
  max-width: 70%;
  margin: 0 auto;
  margin-top: 4%;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const VerticalDivider = styled.div`
  height: 2.5rem;
  border-left: 1px solid #09144D;
`;

const Site = styled.span`
  font-size: 1.4rem;
  color: gray;

`;

const Line = styled.hr`
  margin: 0.3rem 0;
  border: 1px solid #09144D;
`;

const SubLine = styled.hr`
  margin: 0.5rem 0;
  border: 0.5px solid gray;
`;

const NoticeContainer = styled.div`
  padding: 1rem 0;
`;

const NoticeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const DateAndViews = styled.div`
  display: flex;
  align-items: center;
  color: #777;
  margin: 0.2rem 0;
`;

const CalendarIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 2px;
  margin-right: 5px;
`;

const ViewIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 15px;
  margin-right: 5px;
`;

const NoticeContent = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  height: 200px;
  overflow-y: auto;
`;

const NoticeOrigin = styled.a`
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  color: blue;
  font-size: 20px;
`;

const NextNotice = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 15px;
`;

const BeforeNotice = styled.div`
  margin-top: 2rem;
  font-weight: bold;
  font-size: 15px;
`;

const notice = [  
  { post_id: 16, type: "상명", site: "통합공지",title: "KB국민카드 학생증 발급안내", posted_date: "2022-08-01", view_count: "1496452",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 6, type: "학과", site: "컴퓨터과학과",title: "수강신청 안내 및 강의시간표", posted_date: "2025-01-22", view_count: "183900",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 5, type: "상명", site: "컴퓨터과학과",title: "K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75448",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 4, type: "상명", site: "학술정보관",title: "잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70704",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 3, type: "상명", site: "대학일자리센터",title: "스마트출결시스템 사용 안내", posted_date: "2025-02-18", view_count: "48424",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 2, type: "상명", site: "SW중심대학사업단",title: "대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43435",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 8, type: "상명", site: "International Student",title: "취업계 안내", posted_date: "2025-02-18", view_count: "43262",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 9, type: "상명", site: "학생생활관",title: "KB국민카드 학생증 발급안내", posted_date: "2022-08-01", view_count: "1496452",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 10, type: "학과", site: "대학원",title: "수강신청 안내 및 강의시간표", posted_date: "2025-01-22", view_count: "183900",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 11, type: "상명", site: "공학교육인증센터",title: "K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75448",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 12, type: "상명", site: "컴퓨터과학과",title: "잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70704",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 13, type: "상명", site: "학술정보관",title: "스마트출결시스템 사용 안내", posted_date: "2025-02-18", view_count: "48424",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 14, type: "상명", site: "대학일자리센터",title: "대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43435",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 15, type: "상명", site: "SW중심대학사업단",title: "취업계 안내", posted_date: "2025-02-18", view_count: "43262",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10" },
  { post_id: 7, type : "상명", site: "학생생활관", title: "[학생복지팀] 2022학년도 주거래은행 변경에 따른 KB국민카드 학생증 상시 발급안내", posted_date: "2022-08-01", view_count: "1,496,452",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"},
  { post_id: 21, type : "학과", site: "컴퓨터과학과", title: "[학사운영팀] 2025학년도 제1학기 수강신청 안내 및 강의시간표 공지", posted_date: "2025-01-22", view_count: "183,900",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"},
  { post_id: 20, type : "상명", site: "대학일자리센터", title: "[학사운영팀/교무팀] 2025학년도 제1학기 K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75,448",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"},
  { post_id: 19, type : "상명", site: "통합대학원공지", title: "[취업진로지원팀] 상명대학교 잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70,704",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"},
  { post_id: 18, type : "상명", site: "SW중심대학사업단", title: "[교무처] 2025학년도 제1학기 스마트출결시스템 사용 및 출결관리 안내", posted_date: "2025-02-18", view_count: "48,424",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"},
  { post_id: 17, type : "상명", site: "학술정보관", title: "[취업진로지원팀] 상명대 대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43,435",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"},
  { post_id: 1, type : "상명", site: "대학원", title: "[학사운영팀] 2025학년도 제1학기 취업계 안내", posted_date: "2025-02-18", view_count: "43,262",post_content: "2025학년도 제1학기 천안캠퍼스 학부 중간고사 시행과 관련하여 아래와 같이 안내합니다.", post_url:"https://www.smu.ac.kr/kor/life/notice.do?mode=view&articleNo=755249&article.offset=0&articleLimit=10"}
];

const Board = () => {
  const { post_id } = useParams();
  const post = notice.find((n) => n.post_id.toString() === post_id);

  if (!post) return <p>존재하지 않는 게시글입니다.</p>;

  return (
    <Container>
      <Title>
        모든공지
        <VerticalDivider />
        <Site>{post.site}</Site>
      </Title>
      <Line />
      <NoticeContainer>
        <NoticeTitle>[{post.type}]{post.title}</NoticeTitle>
        <DateAndViews>
          <CalendarIcon src={calendarIcon} alt="calendar" />{post.posted_date}
          <ViewIcon src={viewIcon} alt="view" />{post.view_count}
        </DateAndViews>
        <SubLine />
        <NoticeContent>
        {post.post_content}
        </NoticeContent>
        <NoticeOrigin href={post.post_url} target="_blank" rel="noopener noreferrer">
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
