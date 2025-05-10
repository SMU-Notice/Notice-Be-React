import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./MyPageProfileEdit.css";

const topCategories = ['상명', '서울'];
const bottomCategories = ['전체', '학사', '일반', '사회봉사', '등록장학', '학생생활', '글로벌', '진로취업', '비교과', '코로나19'];

export const MyPageProfileEdit = () => {
  const navigate = useNavigate();
  const goToBookmark = () => {
    navigate('/bookmark');
  };
  const goToProfileEdit = () => {
    navigate('/MyPageProfileEdit');
  };

  const [selectedTop, setSelectedTop] = useState('');
  const [selectedBottom, setSelectedBottom] = useState('');
  const [selectedPairs, setSelectedPairs] = useState([]);

  const handleTopClick = (category) => {
    setSelectedTop(category);
    if (selectedBottom) {
      addPair(category, selectedBottom);
    }
  };

  const handleBottomClick = (category) => {
    setSelectedBottom(category);
    if (selectedTop) {
      addPair(selectedTop, category);
    }
  };

  const addPair = (top, bottom) => {
    const pair = `${top}/${bottom}`;
    if (!selectedPairs.includes(pair)) {
      setSelectedPairs([...selectedPairs, pair]);
    }
    // 선택 초기화
    setSelectedTop('');
    setSelectedBottom('');
  };

  const removePair = (pairToRemove) => {
    setSelectedPairs(selectedPairs.filter((pair) => pair !== pairToRemove));
  };

  return (
    <div className="profileedit-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button onClick={goToBookmark}>북마크</button>
            <button>
              메일<br/>관리
            </button>
            <button onClick={goToProfileEdit}>
              회원<br/>정보
            </button>
          </div>
        </nav>
      </aside>
      {/* 메인 영역 */}
      <div className="main">
        <h2 className="title">메일 관리</h2>

        {/* 선택된 카테고리 */}
        <div style={{ marginBottom: '30px' }}>
          <h4>선택된 카테고리</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {selectedPairs.map((pair) => (
              <div
                key={pair}
                style={{
                  background: '#1b1d4d',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {pair}
                <button
                  onClick={() => removePair(pair)}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리 추가 */}
        <main>
          <h4>카테고리 추가</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', marginTop: '10px' }}>
            {topCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTopClick(cat)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: selectedTop === cat ? '#1b1d4d' : '#ccc',
                  color: selectedTop === cat ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {bottomCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleBottomClick(cat)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: selectedBottom === cat ? '#1b1d4d' : '#ccc',
                  color: selectedBottom === cat ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPageProfileEdit;