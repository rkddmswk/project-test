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
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Add, List, PersonAdd, ChangeHistory } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import Nav from "./nav/nav";
import Header from "./header/header";
import TabPanel from "./tabPanel";
import Main from "../component/main/Main";

const Layout = () => {
  const [lights, setLights] = useState(0);
  const handleChange = (e: any, newValue: number) => {
    setLights(newValue);
  };
  const theme = useTheme();

  return (
    <>
      <Box sx={{ width: "100%", float: "left" }}>
        {/* <Header /> */}
        {/* 헤더 */}
        <AppBar
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
        </AppBar>
        <TabPanel value={lights} index={0} dir={theme.direction}>
          <Main />
        </TabPanel>
      </Box>
      <Nav />
    </>
  );
};

export default Layout;
