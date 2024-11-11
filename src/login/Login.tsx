import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const userInfo = {
    username: "",
    userpassword: "",
  };
  useEffect(() => {
    axios.post("http://localhost:3000/login", userInfo).then((res) => {
      console.log(res);
    });
  }, []);

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
              />
            </Box>

            <Box className="inputTextArea">
              <input
                name="passwd"
                id="passwd"
                type="password"
                // onKeyDown="javascript:if (event.keyCode == 13) { actionLogin('dashboard.html'); }"
                placeholder="패스워드를 입력해 주세요."
              />
            </Box>

            <Box className="btnArea">
              <div
                className="btn btn-login btn-skyblue width-100p"
                // onClick="actionLogin('dashboard.html')"
              >
                로그인
              </div>
            </Box>
          </fieldset>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
