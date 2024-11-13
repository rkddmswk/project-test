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
    return [200, { message: "Login successful", token: "fake-jwt-token" }];
  } else {
    return [401, { message: "Invalid credentials" }];
  }
});

// 회원등록
mock.onPost("/userInsert").reply((config) => {
  console.log(config);
  const { id, name, phone, password } = JSON.parse(config.data);
  // console.log(id);
  // console.log(password);
  // console.log(name);
  // console.log(phone);
  const userInfo = testData.filter(
    (info) => info.id === id || info.phone === phone
  );
  if (userInfo.length > 0) {
    console.log("ddd");
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

mock.onGet("/userInfo").reply(200, testData);

export default api;

// case1. 파라미터가 없는 경우
// mock.onGet("/").reply(200, testData);
// mock.onGet("/").reply(404, "error:::");
// mock.onGet("/").reply((config) => {
//   return [200, { message: `성공::: ${config.params.post}` }];
// });
// mock.onPost("http://login").reply((config) => {
//   const data = JSON.parse(config.data);
//   return [200, { message: `성공::: ${data.data.post}` }];
// });
