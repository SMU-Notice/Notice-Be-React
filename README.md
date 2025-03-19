# SmuNoticeFront

---

### Commit Message Convention (커밋 하실떄 아래 내용 참고하셔서 확실하게 풀리퀘 보내주시면 됩니다.)

`feat`: 기능 추가, 삭제, 변경

`fix`: 버그 수정

`docs`: 문서 추가, 삭제, 변경 - 코드 수정없음

`style`: 코드 형식, 정렬, 주석 등의 변경
(세미콜론 추가 같은 코드 수정이 있으나, 기능에 변동 X)

`refactor`: 코드 리펙토링 (변수명, JS -> TS)

`test`: 테스트 코드 추가, 삭제, 변경 등

`chore`: 위에 해당하지 않는 모든 변경, eg. 빌드 스크립트 수정, 패키지 배포 설정 변경

---

### 이름 짓기

`상수` : 전체 대문자, STORE_VISIT
`컴포넌트`: HeaderComponent
`함수`: function headerComponent { }
생략하지 않고 다 적기

---

### 스타일 컴포넌트

컴포넌트, 페이지지 개발시, `components` 폴더 내부에 `NaviBar`폴더 생성 후 `NaviBar.jsx` 컴포넌트에 style component 적용하고 싶을시 `NaviBar.styled.js` 파일 만들어 별도로 스타일 컴포넌트 파일 분리하면 됩니다.
페이지도, 동일하게, pages 파일에 본인 작업하는 페이지의 폴더를 만들어서 관리하면 됩니다!

---
