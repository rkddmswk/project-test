import axios from "axios";
// import { testData } from "../testData";
import MockAdapter from "axios-mock-adapter";
import { testData } from "../testData";

// Axios 인스턴스를 생성한다.
const api = axios.create({
  baseURL: "https://localhost:3000/api",
  timeout: 1000,
});

// axios-mock-adapter를 설정해 요청을 모킹한다.
const mock = new MockAdapter(api);

mock.onPost("/login").reply((config) => {
  console.log(config);
  // put요청중 data만 추출한다.
  const { id, password } = JSON.parse(config.data);
  console.log(id);
  console.log(password);
  const user = testData.find(
    (userInfo) => userInfo.id === id && userInfo.passWord === password
  );
  if (user) {
    return [200, { message: "Login successful", token: "fake-jwt-token" }];
  } else {
    return [401, { message: "Invalid credentials" }];
  }
});

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
