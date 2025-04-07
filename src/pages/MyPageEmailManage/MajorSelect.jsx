import React, { useState } from 'react';

const collegeData = {
  '인문사회과학대학': ['국어국문학과', '사회학과', '심리학과'],
  '사범대학': ['교육학과', '윤리교육과'],
  '경영경제대학': ['경제금융학부', '경영학부', '글로벌경영학과', '융합경영학과'],
  '융합공과대학': ['AI소프트웨어학과', '기계공학과']
};

export const MajorSelect = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedMajor('');
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  return (
    <>
    <h1 style={{ marginBottom: '0px', fontSize: '16px' }}>학과 수정하기</h1>
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <select value={selectedCollege} onChange={handleCollegeChange}>
        <option value="">단과대학 선택</option>
        {Object.keys(collegeData).map((college) => (
          <option key={college} value={college}>
            {college}
          </option>
        ))}
      </select>

      <select value={selectedMajor} onChange={handleMajorChange} disabled={!selectedCollege}>
        <option value="">학과 선택</option>
        {selectedCollege &&
          collegeData[selectedCollege].map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
      </select>

      {/* <button style={{ background: '#1b1d4d', color: '#fff', padding: '6px 12px', borderRadius: '4px' }}>
        인증하기
      </button> */}
    </div>
    </>
  );
};

export default MajorSelect;
