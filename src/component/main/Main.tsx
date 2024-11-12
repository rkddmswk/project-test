import { Box, Typography } from "@mui/material";
import Header from "../../layouts/header/header";

const Main = () => {
  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography>회원현황</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Main;
