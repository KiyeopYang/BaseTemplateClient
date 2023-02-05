Static 클라이언트 CICD 구성 방법

1. 스태틱 빌드 스크립트 완료
2. next.config.js에서  trailingSlash: true 세팅 (이렇게 해도 쿼리스트링 동작 안하므로 next쓸거면 vercel 추천)
3. AWS CLI 토큰 발급
4. 깃허브 액션에서 키 등록 * AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
5. S3 생성 - ACL 하지 않고, Public 허용
6. 권한에서 퍼블릭 권한 세팅
7. 웹 도메인으로 띄우는 것 켜기
8. Route 53 도메인 발급
9. 인증서 발급
10. CloudFront 생성, https 인증서 적용하고 S3 도메인 바라보도록 세팅
11. rooute 53에서 cloudfront 바라보도록 세팅
12. 도메인으로 접속
13. push 후 자동 배포 확인
