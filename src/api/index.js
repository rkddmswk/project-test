import axios from "axios";
import { testData } from "../testData";
import MockAdapter from "axios-mock-adapter";

// 인스턴스 생성
// const mockUserInfo = testData();
const mock = new MockAdapter(axios);

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

// case2. 파라미터가 있는 경우
mock.onPost("http://localhost:3000/login").reply((config) => {
  const { userId, userPw } = JSON.parse(config.data);

  if (userId === testData.name && userPw === testData.password) {
    return [200, { message: "로그인 성공", token: "fake-jwt-token" }];
  } else {
    return [401, { message: "로그인 실패: 잘못된 아이디 또는 비밀번호" }];
  }
});

export default mock;
