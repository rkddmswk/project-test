import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/header/header";
import Nav from "../../layouts/nav/nav";
import { useEffect, useState } from "react";
import api from "../../api/api";

const User = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [userInfoData, setUserInfoData] = useState([]);

  // useEffect(() => {
  //   const data = localStorage.getItem("userInfoData");
  //   if (data) {
  //     setUserInfoData(JSON.parse(data));
  //   }
  // }, [userInfoData]);

  useEffect(() => {
    api
      .get("https://localhost:3000/api/userInfo")
      .then((res) => {
        console.log(res.data);
        setUserInfoData(res.data);
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  }, [userInfoData]);

  const headerData = [
    { name: "No" },
    { name: "아이디(이메일)" },
    { name: "전화번호" },
    { name: "지갑주소" },
    { name: "코인잔액" },
    { name: "등록일" },
    { name: "충전차감" },
    { name: "회원삭제" },
    { name: "거래차단" },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div className="container">
      <Nav />
      <div id="contentsArea">
        <Header />
        <main>
          <section className="sectionBlock noBorder">
            <h1 className="subTitle">회원목록</h1>
          </section>
          <section className="sectionBlock noBorder">
            <div className="searchSectionBlock">
              <table className="searchTable">
                <colgroup>
                  <col width="100px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="label">기간</td>
                    <td>
                      <input
                        id="sdate"
                        name="sdate"
                        type="text"
                        value="20180111"
                        // readonly="readonly"
                        className="date"
                      />
                      ~
                      <input
                        id="edate"
                        name="edate"
                        type="text"
                        value="20180112"
                        // readonly="readonly"
                        className="date"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">구분</td>
                    <td>
                      <select
                        name="condition"
                        id="condition"
                        style={{ width: "100px" }}
                      >
                        <option value="name">이름</option>
                        <option value="email">아이디</option>
                        <option value="tel">전화번호</option>
                      </select>
                      <input
                        id="keyword"
                        name="keyword"
                        type="text"
                        value=""
                        className="w307p"
                      />
                      <button
                        className="btn btn-big btn-skyblue"
                        type="button"
                        id="searchBtn"
                      >
                        <i className="fas fa-search"></i> 검색
                      </button>
                      <button
                        className="btn btn-big btn-white"
                        type="button"
                        id="registBtn"
                        onClick={() => navigate("/userInsert")}
                      >
                        회원등록
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="sectionBlock">
            <TableContainer
              component={Paper}
              sx={{ borderBottom: "1px solid #3695ff" }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {headerData.map((header) => (
                      <StyledTableCell key={header.name}>
                        {header.name}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfoData.map((content: any, index: number) => (
                    <TableRow>
                      <TableCell>{index}</TableCell>
                      <TableCell>{content.id}</TableCell>
                      <TableCell>{content.phone}</TableCell>
                      <TableCell>{content.address}</TableCell>
                      <TableCell>{content.coin}</TableCell>
                      <TableCell>{content.update}</TableCell>
                      <TableCell>
                        <Button
                          sx={{ border: "1px solid #3695ff", borderRadius: 0 }}
                        >
                          코인변경
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            color: "white",
                            background: "#484848",
                            borderRadius: 0,
                          }}
                        >
                          회원삭제{" "}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            color: "white",
                            background: "#b83535",
                            borderRadius: 0,
                          }}
                        >
                          거래차단{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </main>
      </div>
    </div>
  );
};
export default User;
