import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../../layouts/header/header";
// import Nav from "../../layouts/nav/nav";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, userList } from "../../redux/menu";
import Pagination from "react-js-pagination";
import "../../assets/css/pagination.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userListData = useSelector((state: any) => state.menu.userList);

  // 로컬 스토리지에서 userList를 가져온다.
  // const storedData = localStorage.getItem("userList");
  // const userList = storedData ? JSON.parse(storedData) : [];
  const [currentList, setCurrentList] = useState(userListData); // slice된 리스트
  const [page, setPage] = useState(1); // 현재페이지 번호
  const itemPerPate = 10; // 페이지당 아이템 개수
  const itemsPerPage = 6; // 페이지 당 게시글 개수

  // 페이지 이동
  const changePageHandler = (page: number) => {
    setPage(page);
  };

  // userList slice할 index 범위
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 페이지가 바뀌거나 필터 변경으로 리스트 변경 시, currentList 다시 정의
  useEffect(() => {
    setCurrentList(userListData.slice(indexOfFirstItem, indexOfLastItem));
  }, [page, userListData]);

  // 초기화
  // useEffect(() => {
  //   dispatch(userList([])); // 빈 배열로 초기화
  // }, [dispatch]); // dispatch가 변경되면 실행

  // 컴포넌트가 렌더링될 때 로컬 스토리지에서 데이터를 가져옵니다.
  // useEffect(() => {
  //   const savedUserInfo = localStorage.getItem("userInfo");
  //   // console.log(savedUserInfo);
  //   if (savedUserInfo) {
  //     // 로컬 스토리지에서 사용자 정보 가져오기
  //     const userInfo = JSON.parse(savedUserInfo);
  //     // 리덕스 상태에 저장
  //     dispatch(userList(userInfo));
  //   }
  // }, [dispatch]);

  // 테이블 헤더 데이터
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

  // 테이블 헤더 스타일
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // 최초실행
  useEffect(() => {
    searchHandler();
  }, []);

  const searchHandler = () => {
    api
      .get("https://localhost:3000/api/userInfo")
      .then((res) => {
        console.log(res.data);
        // dispatch(userList(res.data));
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  };

  const handleDetailController = (rowKey: number) => {
    console.log(rowKey);
    navigate(`/users/usersDetail/${rowKey}`);
  };

  // 회원삭제버튼
  const handleDeleteController = (event: any, key: number) => {
    event.stopPropagation(); // 이벤트 중지
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return; // 사용자가 취소하면 중단
    }
    api
      .post("https://localhost:3000/api/userInfo/delete", { key: key })
      .then((res) => {
        console.log(res.data);
        const deleteData = res.data;

        // 리덕스 상태 업데이트
        dispatch(deleteUser(key));

        // 로컬 스토리지에서 기존 데이터 가져오기
        // const storedUserList = JSON.parse(
        //   localStorage.getItem("userList") || "[]"
        // );
        // const updatedUserList = storedUserList.filter(
        //   (user: { key: number }) => user.key !== key
        // );
        // 로컬 스토리지 업데이트
        localStorage.setItem("userList", JSON.stringify(deleteData));
        searchHandler();

        alert("사용자가 삭제되었습니다.");
      });
    // .catch((error) => {
    //   console.log("Login failed", error);
    //   alert("사용자 삭제에 실패했습니다. 다시 시도해주세요.");
    // });
  };

  return (
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DemoItem>
                        <DesktopDatePicker
                          defaultValue={dayjs("2022-04-17")}
                          sx={{
                            width: 200,
                            height: 30,
                            ".MuiInputBase-root": {
                              width: 200,
                              height: 30,
                              // padding: "2px 4px", // Adjust internal padding
                              fontSize: "12px", // Adjust font size
                              backgroundColor: "#f0f0f0", // 배경색
                            },
                            ".MuiInputBase-input": {
                              // 스핀 버튼 제거
                              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                                {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                              MozAppearance: "textfield", // Firefox 대응
                              inputMode: "text", // 숫자 모드 제거
                            },
                          }}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  {/* <input
                    id="sdate"
                    name="sdate"
                    type="text"
                    // value="20180111"
                    // readonly="readonly"
                    className="date"
                  /> */}
                  ~
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DemoItem>
                        <DesktopDatePicker
                          defaultValue={dayjs("2022-04-17")}
                          sx={{
                            width: 150,
                            height: 30,
                            ".MuiInputBase-root": {
                              height: 30,
                              padding: "2px 4px", // Adjust internal padding
                              fontSize: "12px", // Adjust font size
                              backgroundColor: "#f0f0f0", // 배경색
                            },
                          }}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  {/* <input
                    id="edate"
                    name="edate"
                    type="text"
                    // value="20180112"
                    // readonly="readonly"
                    className="date"
                  /> */}
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
                    // value=""
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
              {Array.isArray(currentList) && currentList.length > 0
                ? currentList.map((content: any, index: number) => (
                    <TableRow
                      key={content.key}
                      sx={{ cursor: "pointer" }}
                      hover
                      onClick={() => handleDetailController(content.key)}
                    >
                      <TableCell>
                        {(page - 1) * itemsPerPage + index + 1}
                      </TableCell>
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
                          onClick={(event) =>
                            handleDeleteController(event, content.key)
                          }
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
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={itemsPerPage} // 한 페이지 당 보여줄 아이템 갯수
        totalItemsCount={userListData.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator에 나타낼 페이지 범위
        prevPageText={"<"} // "이전"을 나타낼 텍스트
        nextPageText={">"} // "다음"을 나타낼 텍스트
        onChange={changePageHandler} // 페이지 변경을 핸들링하는 함수
      />
    </main>
  );
};
export default User;
