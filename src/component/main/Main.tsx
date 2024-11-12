import { Box, Typography } from "@mui/material";

const Main = () => {
  return (
    <>
      {/* <Typography>회원현황</Typography> */}
      <Box
        sx={{
          // display: "flex",
          alignItems: "center",
          marginBottom: 2,
          float: "right",
          width: "calc(100vw - 200px)",
        }}
      >
        <Typography>회원현황</Typography>
      </Box>
    </>
  );
};

export default Main;
