import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../../redux/user";
import api from "../../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const inputIdRef = useRef<HTMLInputElement>(null);
  const inputPwRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  // 로그인 api호출하기
  const handleLoginController = () => {
    if (userId === "") {
      alert("아이디를 입력해주세요");
      if (inputIdRef.current) {
        inputIdRef.current.focus();
      }
      return;
    } else if (userPw === "") {
      alert("비밀번호를 입력해주세요");
      if (inputPwRef.current) {
        inputPwRef.current.focus();
      }
      return;
    }
    api
      .post("https://localhost:3000/api/login", {
        id: userId,
        password: userPw,
      })
      .then((res) => {
        // console.log(res.data.data);
        const userData = res.data.data;
        if (res.data) {
          // 로그인 성공시
          alert("환영합니다.");
          // Redux에 사용자 정보 저장
          dispatch(setUser(userData));
          // 세션 스토리지에 사용자 정보 저장
          sessionStorage.setItem("user", JSON.stringify(userData));
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
                maxLength={15}
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
                maxLength={15}
                placeholder="패스워드를 입력해 주세요."
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
                ref={inputPwRef}
              />
            </Box>

            <ButtonGroup className="btnArea">
              <Button
                className="btn btn-login btn-skyblue width-100p"
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
