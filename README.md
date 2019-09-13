# <개인 홈페이지 프로젝트> Hopage

 자소서... 늪에서 빠지지 못하는 중(9/15까지...)
## 지금까지 해결 한 것
- [x] nginx 및 node.js 환경 설정
- [x] node.js express 환경 구축 api 공부
- [x] jwt를 사용한 register, login 기능 구현
- [x] socket.io를 사용한 websocket 통신 공부 적용
- [x] curl 명령어를 사용한 리눅스 환경에서의 request 및 event 처리
- [ ] 리액트 프론트와 합치기
- [ ] 완전한 타입 스크립트 적용 
- [ ] nginx 로드 밸런스 처리
- [ ] https > http2 적용
- [ ] 스트레스 테스트 진행해보기 artilery 사용
- [ ] 도커 파일로 만들기

### 참고 블로그 및 내용 정리
- socket.io
[참고 링크](https://socket.io)
- jwt 저장 및 보안 문제를 처리 하기 위한 방법
    + refresh_token , sliding session 방법 
    + localstorage, sessionstorage > 보안에 취약
    + cookie    > 비교적 보안에 좋으나 취약점은 여전히 존재 + 쿠키 사용허가 문제?
    + indexedDB > 조사 해볼 것
    + access_token에는 개인 정보 및 민감한 정보 저장 하지 말 것! 
    + access_token의 유효 시간을 짧게 유지하는 것이 보안성이 좋다.

### 홈페이지 주소
- 아직 미적용..