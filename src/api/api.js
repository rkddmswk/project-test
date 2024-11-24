import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { testData } from "../testData";
import { menuUrl } from "../utils/menu-url";
import { store } from "../redux/index";
import { userList } from "../redux/menu";
import dayjs from "dayjs";

// Axios 인스턴스를 생성한다.
const api = axios.create({
  baseURL: "https://localhost:3000/api",
  timeout: 1000,
});

// axios-mock-adapter를 설정해 요청을 모킹한다.
const mock = new MockAdapter(api);

// Redux 상태에서 사용자 목록 가져오는 함수
const getReduxUserList = () => {
  return store.getState().menu.userList || [];
};

// Redux 상태 초기화
// const currentList = getReduxUserList();
// if (currentList.length === 0) {
//   store.dispatch(userList(testData)); // 초기 데이터로 Redux 상태 설정
// }

// 로그인
mock.onPost("/login").reply((config) => {
  // Redux 상태에서 사용자 목록 가져오는 함수
  // const userListData = getReduxUserList();

  // Redux 상태 초기화
  const currentList = getReduxUserList();
  if (currentList.length === 0) {
    store.dispatch(userList(testData)); // 초기 데이터로 Redux 상태 설정
  }

  // 프론트에서 받은 id, password값을 data에 저장한다.
  const { id, password } = JSON.parse(config.data);

  // 입력한 id, password가  기본회원정보와 동일한 값이 있는지 찾는다.
  const userData = getReduxUserList().find(
    (userData) => userData.id === id && userData.password === password
  );

  if (userData) {
    return [
      200,
      { message: "Login successful", data: userData },
      // { message: "Login successful", token: "fake-jwt-token", data: userData },
    ];
  } else {
    alert("해당하는 아이디와 비밀번호가 일치하지 않습니다.");
    return [401, { message: "Invalid credentials" }];
  }
});

// 메뉴
mock
  .onGet("/menuName")
  .reply(200, { message: "menu successful", data: menuUrl });

// 회원등록
mock.onPost("/userInsert").reply((config) => {
  // 새로운 데이터
  const { id, password, name, phone, address, coin, update } = JSON.parse(
    config.data
  );

  // Redux 상태에서 사용자 목록 가져오기
  const userListData = getReduxUserList();
  // console.log(userListData);

  // 초기 상태가 비어 있으면 testData를 사용
  if (userListData.length === 0) {
    userListData = [...testData];
    store.dispatch(userList(userListData)); // Redux 상태 초기화
  }

  // testData 데이터에서 중복 id값, 전화번호값 필터링
  const userInfo = userListData.some(
    (info) => info.id === id || info.phone === phone
  );

  //  중복확인 및 처리
  if (userInfo) {
    alert("ID 또는 전화번호가 이미 사용 중입니다. 다시 입력해주세요");
    return [400, { message: "ID 또는 전화번호가 이미 사용 중입니다." }];
  } else {
    // 새로운 데이터 생성
    const newUser = { id, password, name, phone, address, coin, update };

    // 새로운 키값 생성
    const newKey = userListData.length + 1;
    const newUserWithKey = { key: newKey, ...newUser };
    // testData.push(newUserWithKey);
    const updatedList = [...userListData, newUserWithKey];
    // console.log(updatedList);

    // Redux 상태 업데이트
    // store.dispatch(userList(updatedList));

    alert("저장되었습니다.");
    return [
      200,
      { message: "User registration successful", data: updatedList },
    ];
  }
});

// 회원목록
mock.onGet("/userInfo").reply((config) => {
  // const userListData = store.getState().menu.userList;
  // console.log(userListData);
  const userList = getReduxUserList();
  // console.log(userList);
  // store.dispatch(userList(userListData));

  // param 받은 데이터 처리하기
  const params = config.params;
  const page = parseInt(params.page, 10) || 1; // 요청한 페이지 번호
  const items = parseInt(params.items, 10) || 6; // 페이지당 아이템수
  const startIndex = (page - 1) * items;
  const endIndex = startIndex + items;

  // 날짜 필터링 처리
  const { startDate, endDate } = params;
  let filteredUserList = userList;

  // startDate 이후의 데이터만 필터링
  if (startDate) {
    filteredUserList = filteredUserList.filter((user) =>
      dayjs(user.update).isAfter(dayjs(startDate).subtract(1, "day"))
    );
  }

  // endDate 이전의 데이터만 필터링
  if (endDate) {
    filteredUserList = filteredUserList.filter(
      (user) => dayjs(user.update).isBefore(dayjs(endDate).add(1, "day")) // 사용자가 입력한 날짜 포함해서 필터링
    );
  }

  const userListData = filteredUserList.slice(startIndex, endIndex); // 데이터 슬라이스
  // console.log(userListData);
  const totalItems = filteredUserList.length; // 전체 데이터 개수

  return [
    200,
    {
      message: "User data fetched successfully",
      data: userListData,
      totalItems: totalItems,
    },
  ];
});

// 회원목록 상세정보
mock.onPost("/userInfo/userDetail").reply((config) => {
  const { key } = JSON.parse(config.data);
  const numberKey = parseInt(key);

  // Redux 상태에서 사용자 목록 가져오기
  const userListData = getReduxUserList();

  const userInfoDetail = userListData.find(
    (infoDetail) => infoDetail.key === numberKey
  );
  if (userInfoDetail) {
    return [200, { message: "UserInfoDetail successful", userInfoDetail }];
  } else {
    return [400];
  }
});

// 회원삭제
mock.onPost("/userInfo/delete").reply((config) => {
  const { key } = JSON.parse(config.data);
  const numberKey = parseInt(key);
  // 로컬 스토리지에서 userList를 가져온다.
  // const storedData = localStorage.getItem("userList");
  // const userList = storedData ? JSON.parse(storedData) : [];

  // Redux 상태에서 사용자 목록 가져오기
  const userListData = [...getReduxUserList()];

  const userIndex = userListData.findIndex((user) => user.key === numberKey);
  // console.log(userIndex);
  if (userIndex !== -1) {
    // userList.splice(userIndex, 1);
    const updatedUserList = userListData.filter(
      (user) => user.key !== numberKey
    );
    // console.log("사용자 삭제 성공:", numberKey);
    // Redux 상태 업데이트
    store.dispatch(userList(updatedUserList));
    return [200, { message: "User deleted successfully", userListData }];
  } else {
    console.log("사용자를 찾을 수 없음:", numberKey);
    return [404, { message: "User not found" }];
  }
});

export default api;
