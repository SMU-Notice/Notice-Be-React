import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";
import searchIcon from "../../assets/search.svg";
import {
  Container, Title, Content, Tabs, Tab, FilterRow, DateInput, SearchBox, SearchInput,
  Dropdown, Wrap, Line, NoticeList, NoticeItem, Site, NoticeText, DateAndViews,
  NoticeTitle, CalendarIcon, ViewIcon, SearchIcon as SearchIconImg
} from "./MainBoardDetailStyle";

// MOCK DATA
const mockNotices = [
  { post_id: 16, type: "상명", site: "통합공지",title: "KB국민카드 학생증 발급안내", posted_date: "2022-08-01", view_count: "1496452" },
  { post_id: 6, type: "통합 게시판", site: "컴퓨터과학과",title: "수강신청 안내 및 강의시간표", posted_date: "2025-01-22", view_count: "183900" },
  { post_id: 5, type: "학생 게시판", site: "컴퓨터과학과",title: "K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75448" },
  { post_id: 4, type: "학과", site: "통합공지",title: "잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70704" },
  { post_id: 3, type: "상명", site: "대학일자리센터",title: "스마트출결시스템 사용 안내", posted_date: "2025-02-18", view_count: "48424" },
  { post_id: 2, type: "상명", site: "SW중심대학사업단",title: "대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43435" },
  { post_id: 8, type: "상명", site: "International Student",title: "취업계 안내", posted_date: "2025-02-18", view_count: "43262" },
  { post_id: 9, type: "상명", site: "학생생활관",title: "KB국민카드 학생증 발급안내", posted_date: "2022-08-01", view_count: "1496452" },
  { post_id: 10, type: "학과", site: "대학원",title: "수강신청 안내 및 강의시간표", posted_date: "2025-01-22", view_count: "183900" },
  { post_id: 11, type: "상명", site: "공학교육인증센터",title: "K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75448" },
  { post_id: 12, type: "학생 게시판", site: "컴퓨터과학과",title: "잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70704" },
  { post_id: 13, type: "상명", site: "학술정보관",title: "스마트출결시스템 사용 안내", posted_date: "2025-02-18", view_count: "48424" },
  { post_id: 14, type: "상명", site: "대학일자리센터",title: "대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43435" },
  { post_id: 15, type: "상명", site: "SW중심대학사업단",title: "취업계 안내", posted_date: "2025-02-18", view_count: "43262" },
  { post_id: 7, type : "상명", site: "학생생활관", title: "[학생복지팀] 2022학년도 주거래은행 변경에 따른 KB국민카드 학생증 상시 발급안내", posted_date: "2022-08-01", view_count: "1,496,452"},
  { post_id: 21, type : "학생 게시판", site: "컴퓨터과학과", title: "[학사운영팀] 2025학년도 제1학기 수강신청 안내 및 강의시간표 공지", posted_date: "2025-01-22", view_count: "183,900"},
  { post_id: 20, type : "상명", site: "대학일자리센터", title: "[학사운영팀/교무팀] 2025학년도 제1학기 K-MOOC 학점인정 안내", posted_date: "2025-02-18", view_count: "75,448"},
  { post_id: 19, type : "상명", site: "통합대학원공지", title: "[취업진로지원팀] 상명대학교 잡플래닛, 에듀스 무료 이용 안내", posted_date: "2025-01-31", view_count: "70,704"},
  { post_id: 18, type : "상명", site: "SW중심대학사업단", title: "[교무처] 2025학년도 제1학기 스마트출결시스템 사용 및 출결관리 안내", posted_date: "2025-02-18", view_count: "48,424"},
  { post_id: 17, type : "상명", site: "학술정보관", title: "[취업진로지원팀] 상명대 대학일자리플러스센터 리플렛", posted_date: "2025-02-17", view_count: "43,435"},
  { post_id: 1, type : "상명", site: "대학원", title: "[학사운영팀] 2025학년도 제1학기 취업계 안내", posted_date: "2025-02-18", view_count: "43,262"}
];

const tabs = ['전체', '통합공지', '컴퓨터과학과', '학술정보관', '대학일자리센터', 'SW중심대학사업단', 'International Student', '학생생활관', '대학원', '공학교육인증센터'];

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

const categoryOptionsMap = {
  전체: [],
  통합공지: ["학과", "상명", "사회봉사"],
  컴퓨터과학과: ["학과 공지", "수강 신청 안내"],
  학술정보관: ["공지사항", "교육공지"],
  대학일자리센터: ["진로/취업프로그램 신청"],
  SW중심대학사업단: ["공지사항"],
  "International Student": ["외국인 유학생 지원"],
  학생생활관: ["학생생활관", "행복생활관"],
  대학원: ["통합 대내 공지"],
  공학교육인증센터: ["공지사항"],
};

// ... 생략된 import 구문 ...

const MainBoardDetail = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('전체');
  const [search, setSearch] = useState(''); // 입력창 상태
  const [submittedSearch, setSubmittedSearch] = useState(''); // 실제 검색어
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('2024-03-01');
  const [endDate, setEndDate] = useState('2026-02-28');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let result = [...mockNotices];

    // 날짜 필터
    result = result.filter(n => n.posted_date >= startDate && n.posted_date <= endDate);

    // 탭 필터
    if (activeTab !== '전체') {
      result = result.filter(n => n.site === activeTab);
    }

    // 카테고리 필터
    if (category) {
      result = result.filter(n => n.type === category);
    }

    // 검색어 필터 (엔터 또는 아이콘 클릭 시 적용)
    if (submittedSearch) {
      result = result.filter(n => n.title.toLowerCase().includes(submittedSearch.toLowerCase()));
    }

    setFiltered(result);
    setPage(1);
  }, [submittedSearch, category, startDate, endDate, activeTab]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch(search);
  };

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <Container>
      <Title>모든 공지</Title>
      <Content>
      <Tabs>
  {tabs.map((tab) => (
    <Tab
      key={tab}
      active={tab === activeTab}
      onClick={() => {
        setActiveTab(tab);
        setCategory(''); // 탭 변경 시 카테고리 초기화
      }}
    >
      {tab}
    </Tab>
  ))}
</Tabs>

        <FilterRow>
          <label>
            게시 날짜 설정
            <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            ~
            <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>

          <Wrap>
  <form onSubmit={handleSearchSubmit}>
    <SearchBox>
      <SearchInput
        placeholder=" 검색어를 입력해 주세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        <SearchIconImg src={searchIcon} alt="search" />
      </button>
    </SearchBox>
  </form>

  {/* 탭에 따른 드롭다운 카테고리 표시 */}
  {categoryOptionsMap[activeTab]?.length > 0 && (
    <Dropdown value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">카테고리 선택</option>
      {categoryOptionsMap[activeTab].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Dropdown>
  )}
</Wrap>
        </FilterRow>

        <Line />

        <NoticeList>
          {paginated.map((notice, index) => (
            <NoticeItem key={notice.post_id} onClick={() => goToBoard(notice.post_id)}>
              <Site noticeType={notice.site}>
                {siteNameMap[notice.site] || notice.site}
              </Site>
              <NoticeText>
                <NoticeTitle first={index === 0}>[{notice.type}]{notice.title}</NoticeTitle>
                <DateAndViews>
                  <CalendarIcon src={calendarIcon} alt="calendar" />{notice.posted_date}
                  <ViewIcon src={viewIcon} alt="view" />{notice.view_count}
                </DateAndViews>
              </NoticeText>
            </NoticeItem>
          ))}
        </NoticeList>

        {/* 페이지네이션 */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", gap: "5px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: page === i + 1 ? '#09144D' : '#fff',
                color: page === i + 1 ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default MainBoardDetail;
