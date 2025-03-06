export const mypageMenus = [
  {
    name: '나의 계정정보',
    children: [
      {
        name: '개인정보 수정',
        path: '/mypage/privacy',
      },
      {
        name: '2차 비밀번호 변경',
        path: '/mypage/password',
      },
      {
        name: '계좌번호 관리',
        path: '/mypage/bank',
      },
      {
        name: '주소록 관리',
        path: '/mypage/address',
      },
      {
        name: '회원탈퇴',
        path: '/mypage/withdrawal',
      },
    ],
  },
  {
    name: '고객센터',
    children: [
      {
        name: '1:1문의',
        path: '/inquiry?returnPath=/mypage',
      },
      {
        name: '공지사항',
        path: '/notice?returnPath=/mypage',
      },
      {
        name: 'FAQ',
        path: '/faq?returnPath=/mypage',
      },
    ],
  },
];
