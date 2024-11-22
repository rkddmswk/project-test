export const menuUrl = [
  {
    menuId: 1,
    menuNm: "홈",
    url: "/main",
    child: [],
  },

  {
    menuId: 2,
    menuNm: "회원관리",
    url: "/users",
    child: [
      {
        menuId: 10,
        menuNm: "등록요청",
        url: "/userRegist",
      },
      {
        menuId: 11,
        menuNm: "회원목록",
        url: "/users",
      },
      {
        menuId: 12,
        menuNm: "회원등록",
        url: "/userInsert",
      },
      {
        menuId: 13,
        menuNm: "거래내역 변경",
        url: "/userTrade",
      },
    ],
  },
  {
    menuId: 3,
    menuNm: "코인관리",
    url: "/coin",
  },
  {
    menuId: 4,
    menuNm: "공지사항",
    url: "/board",
  },
  {
    menuId: 5,
    menuNm: "IP관리",
    url: "/ip",
  },
  {
    menuId: 6,
    menuNm: "관리자관리",
    url: "/management",
  },
];
