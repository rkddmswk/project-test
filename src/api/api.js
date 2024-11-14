import axios from "axios";
// import { testData } from "../testData";
import MockAdapter from "axios-mock-adapter";
import { testData } from "../testData";
import { Info } from "@mui/icons-material";

// Axios 인스턴스를 생성한다.
const api = axios.create({
  baseURL: "https://localhost:3000/api",
  timeout: 1000,
});

// axios-mock-adapter를 설정해 요청을 모킹한다.
const mock = new MockAdapter(api);

// 로그인
mock.onPost("/login").reply((config) => {
  console.log(config);
  // put요청중 data만 추출한다.
  const { id, password } = JSON.parse(config.data);
  console.log(id);
  console.log(password);
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
    return [401, { message: "Invalid credentials" }];
  }
});

// 회원등록
mock.onPost("/userInsert").reply((config) => {
  console.log(config);
  const { id, name, phone, password } = JSON.parse(config.data);
  const userInfo = testData.filter(
    (info) => info.id === id || info.phone === phone
  );
  if (userInfo.length > 0) {
    alert("ID 또는 전화번호가 이미 사용 중입니다. 다시 입력해주세요");
    return [400, { message: "ID 또는 전화번호가 이미 사용 중입니다." }];
  } else {
    const newUser = { id, name, phone, password };
    testData.push(newUser);
    alert("저장되었습니다.");
    return [200, { message: "User registration successful", testData }];
  }

  // const userInfo = testData.find((info) => {
  //   return info.id !== id && info.phone !== phone;
  //   if (info.id !== id && info.phone !== phone) {
  //     console.log("들어옴?");
  //     return [200, userInfo];
  //   }
  // });
});

// 회원목록
mock.onGet("/userInfo").reply(200, testData);

// 회원목록 상세정보
mock.onPost("/userInfo/userDetail").reply((config) => {
  console.log(config);
  const { key } = JSON.parse(config.data);
  const numberKey = parseInt(key);
  console.log(typeof numberKey);
  const userInfoDetail = testData.find(
    (infoDetail) => infoDetail.key === numberKey
  );
  if (userInfoDetail) {
    return [200, { message: "UserInfoDetail successful", userInfoDetail }];
  } else {
    console.log("들어옴?");
    return [400];
  }
});

// 회원삭제
mock.onPost("/userInfo/delete").reply((config) => {
  const { key } = JSON.parse(config.data);
  console.log(key);
  const numberKey = parseInt(key);
  const userIndex = testData.findIndex((user) => user.key === numberKey);
  console.log(userIndex);

  if (userIndex !== -1) {
    testData.splice(userIndex, 1);
    console.log("사용자 삭제 성공:", numberKey);
    return [200, { message: "User deleted successfully", testData }];
  } else {
    console.log("사용자를 찾을 수 없음:", numberKey);
    return [404, { message: "User not found" }];
  }
});

export default api;
