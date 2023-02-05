Static 클라이언트 CICD 구성 방법

1. 스태틱 빌드 스크립트 완료
2. AWS CLI 토큰 발급
3. 깃허브 액션에서 키 등록 * AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
5. S3 생성 - ACL 하지 않고, Public 허용
6. 권한에서 퍼블릭 권한 세팅
7. 웹 도메인으로 띄우는 것 켜기
8. Route 53 도메인 발급
9. 인증서 발급
8. CloudFront 생성, https 인증서 적용하고 S3 도메인 바라보도록 세팅
9. rooute 53에서 cloudfront 바라보도록 세팅
10. 도메인으로 접속
11. push 후 자동 배포 확인
