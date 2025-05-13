import styled from 'styled-components';
import BookMarkIcon from '../../assets/bookmark.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-top: 30px;
  position: relative;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 25px;
  text-align: center;
  color: #09144D;
`;

const NoticeList = styled.div`
  width: 60%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.1s ease-in-out, font-weight 0.1s ease-in-out;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f0f8ff;
    font-weight: bold;
    color: #09144D;
  }
`;

const Type = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center; 
  font-size: 9px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 10px;
  width: ${(props) => (props.first ? "25px" : "20px")};
  height: ${(props) => (props.first ? "25px" : "20px")};
  color: white;
  border-radius: 50%;
  text-align: center;
  background-color: ${(props) => {
  switch (props.noticeType) {
    case "통합공지":
      return "#09144D"; // 네이비
    case "컴퓨터과학과":
      return "#91CE44"; // 블루그린
    case "학술정보관":
      return "#00A2E5"; // 인디고
    case "대학일자리센터":
      return "#393a96"; // 퍼플
    case "SW중심대학사업단":
      return "#B51385"; // 오렌지
    case "International Student":
      return "#EE334E"; // 다크그린
    case "학생생활관":
      return "#F9A13A"; // 버건디
    case "대학원":
      return "#FFDF1C"; // 포레스트그린
    case "공학교육인증센터":
      return "#009688"; // 틸
  }
  }};  
`;

const NoticeText = styled.div`
  flex: 1;
`;

const DateAndViews = styled.div`
  font-size: 12px;
  color: #777;
`;

const NoticeTitle = styled.div`
  font-size: ${(props) => (props.first ? "20px" : "15px")};
  font-weight: ${(props) => (props.first ? "bold" : "")};
  margin-bottom: 3px;
`

const CalendarIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 2px;
`

const ViewIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
`

const PostedTodayIcon = styled.img`
  margin-left: 3px;
  width: 12px;
  height: 12px;
`
const StyledBookMarkIcon = styled(BookMarkIcon)`
  fill: ${({ isBookmarked }) => (isBookmarked ? 'red' : '#ccc')};
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
`;

export {Container, Title, NoticeList, NoticeItem, Type, NoticeText, DateAndViews, NoticeTitle, CalendarIcon, ViewIcon, PostedTodayIcon, StyledBookMarkIcon};