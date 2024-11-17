import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { testData } from "../testData";

// Axios 인스턴스를 생성한다.
const api = axios.create({
  baseURL: "https://localhost:3000/api",
  timeout: 1000,
});

// axios-mock-adapter를 설정해 요청을 모킹한다.
const mock = new MockAdapter(api);

// 로그인
mock.onPost("/login").reply((config) => {
  // put요청중 data만 추출한다.
  const { id, password } = JSON.parse(config.data);
  const user = testData.find(
    (userData) => userData.id === id && userData.passWord === password
  );
  if (user) {
    return [
      200,
      { message: "Login successful", token: "fake-jwt-token", data: user },
    ];
  } else {
    alert("해당하는 아이디와 비밀번호는 이미 존재합니다.");
    return [
      401,
      { message: "Invalid credentials" },
      alert("해당하는 아이디와 비밀번호는 이미 존재합니다."),
    ];
  }
});

// 회원등록
mock.onPost("/userInsert").reply((config) => {
  // 새로운 데이터
  const { id, password, name, phone } = JSON.parse(config.data);

  // 로컬스토리지에서 기존 사용자 데이터 가져오기
  let userTotalData = JSON.parse(localStorage.getItem("userList")) || []; // 기존 사용자 데이터 (없으면 빈 배열)

  // userTotalData 데이터에서 중복 id값, 전화번호 값 필터링
  const userInfo = userTotalData.some(
    (info) => info.id === id || info.phone === phone
  );
  console.log(userInfo);

  // 중복확인 및 처리
  if (userInfo) {
    alert("ID 또는 전화번호가 이미 사용 중입니다. 다시 입력해주세요");
    return [400, { message: "ID 또는 전화번호가 이미 사용 중입니다." }];
  } else {
    const newUser = { id, password, name, phone };

    // 새로운 키값 생성
    const newKey = userTotalData.length
      ? Math.max(...userTotalData.map((user) => user.key)) + 1
      : 1; // 첫 번째 사용자는 key = 1로 설정
    console.log(newKey);

    const newUserKey = { key: newKey, ...newUser };
    userTotalData.push(newUserKey);
    console.log(userTotalData);

    // 로컬 스토리지에 업데이트된 사용자 데이터 저장
    localStorage.setItem("userList", JSON.stringify(userTotalData));

    // 새로운 사용자 정보
    // const newUser = { id, password, name, phone };
    // 배열의 마지막 키값을 기준으로 새 키값 계산
    // const newUserId = testData.length
    //   ? Math.max(...testData.map((user) => user.key)) + 1
    //   : 1; // 첫 번째 사용자는 key = 1로 설정
    // testData.push(newUser);
    // console.log(testData.length);
    // const newUserId = testData.length + 1; // 전체 배열길이를 키값으로 지정
    // console.log(newUserId);

    // testData의 배열의 새로 추가된 사용자 객체에게 key속성을 추가함
    // const updatedUser = { key: newUserId, ...testData.pop() };
    // testData.push(updatedUser);
    // console.log(testData);

    alert("저장되었습니다.");
    return [200, { message: "User registration successful", userTotalData }];
  }
});

// 회원목록
// mock.onGet("/userInfo").reply(200, userTotalData, console.log(userTotalData));

mock.onGet("/userInfo").reply((config) => {
  const { page = 1, limit = 10 } = config.params;
  // 로컬 스토리지에서 userList를 가져온다.
  const storedData = localStorage.getItem("userList");
  const userList = storedData ? JSON.parse(storedData) : [];
  console.log(userList);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = userList.slice(startIndex, endIndex);

  return [200, { users: paginatedUsers, totalCount: userList.length }];
});

// 회원목록 상세정보
mock.onPost("/userInfo/userDetail").reply((config) => {
  const { key } = JSON.parse(config.data);
  const numberKey = parseInt(key);
  // console.log(typeof numberKey);
  // 로컬 스토리지에서 userList를 가져온다.
  const storedData = localStorage.getItem("userList");
  const userDetailData = storedData ? JSON.parse(storedData) : [];
  const userInfoDetail = userDetailData.find(
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
  console.log(key);
  const numberKey = parseInt(key);
  // 로컬 스토리지에서 userList를 가져온다.
  const storedData = localStorage.getItem("userList");
  const userList = storedData ? JSON.parse(storedData) : [];
  const userIndex = userList.findIndex((user) => user.key === numberKey);
  console.log(userIndex);
  if (userIndex !== -1) {
    userList.splice(userIndex, 1);
    console.log("사용자 삭제 성공:", numberKey);
    console.log(testData);
    return [200, { message: "User deleted successfully", testData }];
  } else {
    console.log("사용자를 찾을 수 없음:", numberKey);
    return [404, { message: "User not found" }];
  }
});

export default api;
