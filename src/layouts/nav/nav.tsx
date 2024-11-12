import { Box, Button, Paper, Typography } from "@mui/material";
import { Add, List, PersonAdd, ChangeHistory } from "@mui/icons-material";

const Nav = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
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
      </Box>
    </>
  );
};

export default Nav;
