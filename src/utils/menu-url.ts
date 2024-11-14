const menuUrl = [
  {
    topmenu: "홈",
    url: "/main",
    depth: 1,
  },

  {
    topmenu: "회원관리",
    url: "/users",
    depth: 2,
    child: [
      {
        submenu: "등록요청",
        url: "/userRegist",
      },
      {
        submenu: "회원목록",
        url: "/users",
      },
      {
        submenu: "회원등록",
        url: "/userInsert",
      },
      {
        submenu: "거래내역 변경",
        url: "/userTrade",
      },
    ],
  },
  {
    topmenu: "코인관리",
    url: "/coin",
  },
  {
    topmenu: "공지사항",
    url: "/board",
  },
  {
    topmenu: "IP관리",
    url: "/ip",
  },
  {
    topmenu: "관리자관리",
    url: "/management",
  },
  // {
  //   url: "/main",
  //   name: "홈",
  // },
  // {
  //   url: "/users",
  //   name: "회원관리",
  // },
  // {
  //   url: "/coin",
  //   name: "코인관리",
  // },
  // {
  //   url: "/board",
  //   name: "공지사항",
  // },
  // {
  //   url: "/ip",
  //   name: "IP관리",
  // },
  // {
  //   url: "/management",
  //   name: "관리자관리",
  // },
];

export default menuUrl;
