import axios, { AxiosRequestConfig } from "axios";
import cookies from "js-cookie";
// import * as jwt from "jsonwebtoken";

export const cehckToken = async (config: AxiosRequestConfig) => {
  const accessToken = cookies.get("access_token") ?? ""; // 기본값으로 빈 문자열 사용
  // const decode = jwt.decode(accessToken);
  const nowDate = new Date().getTime();

  // 토큰 만료시간이 지났다면
  // if (decode.exp < nowDate) {
  //   const { data } = await axios.post(
  //     `${SERVER_URL}/token`,
  //     { accessToken },
  //     {
  //       headers: {
  //         access_token: getToken(),
  //       },
  //     }
  //   );
  //   // 리프레쉬 토큰 발급 서버 요청
  // }
};
