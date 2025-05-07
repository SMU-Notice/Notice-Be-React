import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getSneakyToken } from "../../mocks/getSneakyToken"
import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";
import searchIcon from "../../assets/search.svg";
import {
  Container, Title, Content, Tabs, Tab, FilterRow, DateInput, SearchBox, SearchInput,
  Dropdown, Wrap, Line, NoticeList, NoticeItem, Site, NoticeText, DateAndViews,
  NoticeTitle, CalendarIcon, ViewIcon, SearchIcon as SearchIconImg
} from "./MainBoardDetailStyle";

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
  통합공지: ["글로벌", "진로취업", "등록/장학", "비교과", "일반"],
  컴퓨터과학과: ["학과 공지", "수강 신청 안내"],
  학술정보관: ["공지사항", "교육공지"],
  대학일자리센터: ["진로/취업프로그램 신청"],
  SW중심대학사업단: ["공지사항"],
  "International Student": ["외국인 유학생 지원"],
  학생생활관: ["학생생활관", "행복생활관"],
  대학원: ["통합 대내 공지"],
  공학교육인증센터: ["공지사항"],
};

const MainBoardDetail = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('전체');
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [postType, setPostType] = useState('');
  const [startDate, setStartDate] = useState('2024-03-01');
  const [endDate, setEndDate] = useState('2026-02-28');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [filtered, setFiltered] = useState([]);

  // 📌 API 호출
  useEffect(() => {
    const fetchNotices = async () => {
      const token = await getSneakyToken("abc@email.com");
      if (!token) {
        console.error("토큰이 없음, 데이터 못 불러옴");
        return;
      }

      try {
        const res = await axios.get('https://test.smu-notice.kr/api/main/board', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (res.data.success) {
          setNotices(res.data.data);
          console.log(res.data.data);
        } else {
          console.error("데이터 응답 오류:", res.data.error);
        }
      } catch (err) {
        console.error("API 호출 실패:", err);
      }
    };
    fetchNotices();
  }, []);

  // 📌 필터링 로직
  useEffect(() => {
    let result = [...notices];

    result = result.filter(n => n.postedDate >= startDate && n.postedDate <= endDate);

    if (activeTab !== '전체') {
      result = result.filter(n => n.boardName === activeTab);
    }

    if (postType) {
      result = result.filter(n => n.postType === postType);  // Changed from category to postType
    }

    if (submittedSearch) {
      result = result.filter(n => n.title.toLowerCase().includes(submittedSearch.toLowerCase()));
    }

    setFiltered(result);
    setPage(1);
  }, [notices, submittedSearch, postType, startDate, endDate, activeTab]);

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
                setPostType('');
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

            {categoryOptionsMap[activeTab]?.length > 0 && (
              <Dropdown value={postType} onChange={(e) => setPostType(e.target.value)}>
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
          {paginated.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>해당 조건에 맞는 공지가 없습니다.</div>
          ) : (
            paginated.map((notice, index) => (
              <NoticeItem key={notice.id} onClick={() => goToBoard(notice.id)}>
                <Site noticeType={notice.boardName}>
                {siteNameMap[notice.site ?? notice.boardName] ?? notice.boardName}
                </Site>
                <NoticeText>
                  <NoticeTitle first={index === 0}>[{notice.postType}]{notice.title}</NoticeTitle>
                  <DateAndViews>
                    <CalendarIcon src={calendarIcon} alt="calendar" />{notice.postedDate}
                    <ViewIcon src={viewIcon} alt="view" />{notice.viewCount.toLocaleString()}
                  </DateAndViews>
                </NoticeText>
              </NoticeItem>
            ))
          )}
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
