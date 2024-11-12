import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Add, List, PersonAdd, ChangeHistory } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import Nav from "./nav/nav";
import Header from "./header/header";

const Layout = () => {
  const [lights, setLights] = useState(0);
  const handleChange = (e: any, newValue: number) => {
    setLights(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* 헤더 */}
      <Header />
      {/* <AppBar
        position="static"
        sx={{
          width: "100%",
          height: "60px",
          boxShadow: "none",
          // borderBottom: "1px solid #DFDFDF",
          // margin: "0 auto",
          padding: "15px",
          boxSizing: "border-box",
        }}
      >
        <Toolbar>
          <img src="" />
          <Typography sx={{ height: "100%", width: "200px", float: "left" }}>
            SUMMIZ
          </Typography>
          <Tabs
            value={lights}
            onChange={handleChange}
            textColor="inherit"
            centered //탭을 가운데로 정렬하는 속성
            sx={{
              marginTop: "-23px",
              float: "left",
              "& .MuiTabs-indicator": {
                backgroundColor: "white",
              },
            }}
          >
            <Tab label="홈" component={Link} to="/main"></Tab>
            <Tab label="회원관리" component={Link} to="/users"></Tab>
            <Tab label="코인관리" component={Link} to="/coin"></Tab>
            <Tab label="공지사항" component={Link} to="/board"></Tab>
            <Tab label="IP관리" component={Link} to="/ip"></Tab>
            <Tab label="관리자관리" component={Link} to="/manage"></Tab>
          </Tabs>
        </Toolbar>
      </AppBar> */}

      {/* 사이드 메뉴 */}
      <Nav />
      {/* <Box sx={{ display: "flex" }}>
        <Paper
          // anchor="left"
          // variant="permanent"
          sx={{
            width: 200,
            height: "calc(100vh - 60px)",
            background: "#1d2327",
            color: "#ffffff",
            "& .MuiDrawer-paper": {
              width: 200,
              height: "100vh",
              padding: 5,
              background: "black",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              height: "100px",
              lineHeight: "100px",
              borderBottom: "2px solid #111111",
            }}
          >
            회원관리
          </Typography>
          <Button
            fullWidth
            sx={{ color: "white", height: "70px", textAlign: "left" }}
            startIcon={<Add />}
          >
            등록요청
          </Button>
          <Button
            fullWidth
            sx={{ color: "white", height: "70px" }}
            startIcon={<List />}
          >
            회원목록
          </Button>
          <Button
            fullWidth
            sx={{ color: "white", height: "70px" }}
            startIcon={<PersonAdd />}
          >
            회원등록
          </Button>
          <Button
            fullWidth
            sx={{ color: "white", height: "70px" }}
            startIcon={<ChangeHistory />}
          >
            거래내역 변경
          </Button>
        </Paper>
      </Box> */}
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
