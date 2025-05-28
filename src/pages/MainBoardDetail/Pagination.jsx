import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 5px;
`;

const PageButton = styled.button`
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  background-color: ${({ active }) => (active ? '#e1e1e1' : 'transparent')};
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border: 1px solid #ccc;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination = ({ page, setPage, pageGroup, setPageGroup, pagesPerGroup }) => {
  return (
    <PaginationWrapper>
      {/* 이전 그룹 이동 */}
      <PageButton
        disabled={pageGroup === 0}
        onClick={() => {
          setPageGroup(prev => {
            const newGroup = prev - 1;
            setPage(newGroup * pagesPerGroup + 1);
            return newGroup;
          });
        }}
      >
        ◀
      </PageButton>

      {/* 숫자 버튼 */}
      {Array.from({ length: pagesPerGroup }, (_, i) => {
        const pageNumber = pageGroup * pagesPerGroup + i + 1;
        return (
          <PageButton
            key={pageNumber}
            active={page === pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        );
      })}

      {/* 다음 그룹 이동 */}
      <PageButton
        onClick={() => {
          setPageGroup(prev => {
            const newGroup = prev + 1;
            setPage(newGroup * pagesPerGroup + 1);
            return newGroup;
          });
        }}
      >
        ▶
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
