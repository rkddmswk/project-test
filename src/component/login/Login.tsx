import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import api from "../../api/api";

import { error } from "console";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const inputIdRef = useRef<HTMLInputElement>(null);
  const inputPwRef = useRef<HTMLInputElement>(null);

  // const handleLoginController = async () => {
  //   console.log("handleLoginController:::");
  //   try {
  //     const response = await api.post("https://localhost:3000/api/login", {
  //       id: userId,
  //       password: userPw,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Login failed:");
  //   }
  // };

  // 로그인 api호출하기
  const handleLoginController = () => {
    api
      .post("https://localhost:3000/api/login", {
        id: userId,
        password: userPw,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          // 로그인 성공시
          alert("환영합니다.");
          navigate("/main");
        }
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  };

  return (
    <Box
      className="container login"
      sx={{ background: "#262d37", minHeight: "100vh" }}
    >
      <Box className="guestBox">
        <Box>
          <Box className="login-logo">
            <img src="./img/logo_login.png" />
          </Box>
          <Typography className="headerText">관리자 로그인</Typography>
        </Box>
        <form method="post" name="loginForm">
          <fieldset>
            <Typography className="sr-only">로그인 정보 입력</Typography>

            <Box className="inputTextArea">
              <input
                name="id"
                id="id"
                type="text"
                placeholder="아이디를 입력해 주세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                ref={inputIdRef}
              />
            </Box>

            <Box className="inputTextArea">
              <input
                name="passwd"
                id="passwd"
                type="password"
                // onKeyDown="javascript:if (event.keyCode == 13) { actionLogin('dashboard.html'); }"
                placeholder="패스워드를 입력해 주세요."
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
                ref={inputPwRef}
              />
            </Box>

            <ButtonGroup className="btnArea">
              <Button
                className="btn btn-login btn-skyblue width-100p"
                // onClick="actionLogin('dashboard.html')"
                onClick={handleLoginController}
              >
                로그인
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
