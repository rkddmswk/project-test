import axios from "axios";
import cookies from "js-cookie";
import MockAdapter from "axios-mock-adapter";
import { testData } from "../testData";

// Axios 인스턴스를 생성한다.
const api = axios.create({
  baseURL: "https://localhost:3000/api", // 서버의 기본 url
  timeout: 1000,
  headers: {
    access_token: cookies.get("access_token"),
  }, // header에 전달해야 하는 객체
});

// axios-mock-adapter를 설정해 요청을 모킹한다.
const mock = new MockAdapter(api);

// 로그인
mock.onPost("/login").reply((config) => {
  console.log(config);
  // put요청중 data만 추출한다.
  const { id, password } = JSON.parse(config.data);
  const user = testData.find(
    (userData) => userData.id === id && userData.passWord === password
  );
  if (user) {
    return [
      200,
      { message: "Login successful", token: "fake-jwt-token", user },
    ];
  } else {
    return [401];
  }
});

export default api;
