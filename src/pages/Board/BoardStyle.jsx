import styled from "styled-components";

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

export {Container, Title, VerticalDivider, Site, Line, SubLine, NoticeContainer, NoticeTitle, DateAndViews, CalendarIcon, ViewIcon, NoticeContent, NoticeOrigin, NextNotice, BeforeNotice};