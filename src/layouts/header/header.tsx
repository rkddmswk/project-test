import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <AppBar
        position="static"
        // color="inherit"
        sx={{
          height: "85px",
          boxShadow: "none",
          borderBottom: "1px solid #DFDFDF",
          margin: "0 auto",
          padding: "15px",
          // boxSizing: 'border-box',
        }}
      >
        <img src="/src/assets/img/ic_logo.png" alt="로고이미지" />
        <Typography></Typography>
      </AppBar>
    </>
  );
};
export default Header;
