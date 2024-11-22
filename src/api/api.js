import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { testData } from "../testData";
import { menuUrl } from "../utils/menu-url";

// Axios 인스턴스를 생성한다.
const api = axios.create({
  baseURL: "https://localhost:3000/api",
  timeout: 1000,
});

// axios-mock-adapter를 설정해 요청을 모킹한다.
const mock = new MockAdapter(api);

// 로컬스토리지에서 기존 사용자 데이터 가져오기
// let userTotalData = JSON.parse(localStorage.getItem("userList")) || []; // 기존 사용자 데이터 (없으면 빈 배열)
// console.log(userTotalData);

// 로그인
mock.onPost("/login").reply((config) => {
  // 프론트에서 받은 id, password값을 data에 저장한다.
  const { id, password } = JSON.parse(config.data);

  // 입력한 id, password가  기본회원정보와 동일한 값이 있는지 찾는다.
  const userData = testData.find(
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
  const { id, password, name, phone } = JSON.parse(config.data);

  // testData 데이터에서 중복 id값, 전화번호값 필터링
  const userInfo = testData.some(
    (info) => info.id === id || info.phone === phone
  );

  //  중복확인 및 처리
  if (userInfo) {
    alert("ID 또는 전화번호가 이미 사용 중입니다. 다시 입력해주세요");
    return [400, { message: "ID 또는 전화번호가 이미 사용 중입니다." }];
  } else {
    // 새로운 데이터 생성
    const newUser = { id, password, name, phone };

    // 새로운 키값 생성
    const newKey = testData.length + 1;
    const newUserWithKey = { key: newKey, ...newUser };
    testData.push(newUserWithKey);
    // console.log(testData);
    alert("저장되었습니다.");
    return [200, { message: "User registration successful", data: testData }];
  }
});

// 회원목록
mock.onGet("/userInfo").reply(200, testData, console.log(testData));

export default api;
