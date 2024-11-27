import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import api from "../../api/api";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const inputIdRef = useRef<HTMLInputElement>(null);
  const inputPwRef = useRef<HTMLInputElement>(null);

  // 로그인버튼
  const handleLoginController = () => {
    // 아이디가 빈값일때 포커싱
    if (userId === "") {
      alert("아이디를 입력해주세요");
      if (inputIdRef.current) {
        inputIdRef.current.focus();
      }
      return;
    } else if (userPw === "") {
      alert("비밀번호를 입력해주세요");
      // 비밀번호가 빈값일때 포커싱
      if (inputPwRef.current) {
        inputPwRef.current.focus();
      }
      return;
    }
    // api호출후 api.js에서 서버처리 요청
    api
      .post("https://localhost:3000/api/login", {
        id: userId,
        password: userPw,
      })
      .then((res) => {
        // console.log(res.data);
        // const userData = res.data.data;
        if (res.data) {
          // 로그인 성공시
          alert("환영합니다.");
          // Redux에 사용자 정보 저장
          // dispatch(setUser(userData));
          // 세션 스토리지에 사용자 정보 저장
          // sessionStorage.setItem("userData", JSON.stringify(userData));
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
          {/* 로고 */}
          <Box className="login-logo">
            <h1
              className="logo ir"
              onClick={() => navigate("/main")}
              style={{
                cursor: "pointer",
                margin: "0 auto",
                width: "150px",
              }}
            ></h1>
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
                placeholder="아이디를 입력해 주세요.(15자 내외)"
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
                placeholder="패스워드를 입력해 주세요.(15자 내외)"
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
