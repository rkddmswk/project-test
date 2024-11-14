import { useState } from "react";
import Header from "../../layouts/header/header";
import Nav from "../../layouts/nav/nav";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../redux/user";
import { useDispatch } from "react-redux";

const UserInsert = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // 회원정보 api호출하기
  const handleSaveController = () => {
    api
      .post("https://localhost:3000/api/userInsert", {
        id: userId,
        password: userPassword,
        name: userName,
        phone: userPhone,
      })
      .then((res) => {
        console.log(res.data.testData);
        // 호출 성공 시 데이터 값을 Redux 상태에 저장
        dispatch(userInfo(res.data.testData));
        navigate("/users");
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  };

  return (
    <>
      <div className="container">
        <Nav />
        {/* contentsArea */}
        <div id="contentsArea">
          <Header />
          <main>
            <section className="sectionBlock noBorder">
              <h1 className="subTitle">회원등록</h1>
            </section>

            <section className="sectionBlock noBorder">
              <div className="editSectionBlock">
                <table className="editTable table-border">
                  <colgroup>
                    <col width="220px" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="label">아이디</td>
                      <td>
                        <input
                          id="uId"
                          name="email"
                          type="email"
                          placeholder="아이디를 입력해주세요"
                          // maxlength="50"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">이름</td>
                      <td>
                        <input
                          id="uName"
                          name="name"
                          type="text"
                          placeholder="이름을 입력해주세요"
                          // maxlength="25"
                          value={userName}
                          maxLength={5}
                          onChange={(e) =>
                            setUserName(
                              e.target.value.replace(/[^ㄱ-ㅎ가-힣ㆍ ᆢ]/gi, "")
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">전화번호</td>
                      <td>
                        <input
                          id="uTel"
                          name="phoneNumber"
                          // maxlength="11"
                          type="tel"
                          className="numOnly"
                          placeholder="전화번호를 입력해주세요"
                          value={userPhone}
                          maxLength={13}
                          onChange={(e) =>
                            setUserPhone(
                              e.target.value
                                .replace(/[^0-9]/g, "")
                                .replace(
                                  /^(\d{0,3})(\d{0,4})(\d{0,4})$/g,
                                  "$1-$2-$3"
                                )
                                .replace(/(\-{1,2})$/g, "")
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">비밀번호</td>
                      <td>
                        <input
                          id="passwd"
                          name="passwd"
                          type="password"
                          // value=""
                          placeholder="비밀번호를 입력해주세요"
                          value={userPassword}
                          maxLength={15}
                          onChange={(e) => setUserPassword(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">담당 관리자 (소속/이름/아이디)</td>
                      <td>
                        <input
                          id=""
                          name=""
                          type="password"
                          // maxlength="8"
                          // readonly="readonly"
                          disabled
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="sectionBlock noBorder margin-top-15">
              <div className="right">
                <button
                  className="btn btn-big btn-color-save"
                  type="button"
                  id="saveBtn"
                  onClick={handleSaveController}
                >
                  저장
                </button>
              </div>
            </section>

            <section className="sectionBlock noBorder margin-top-60">
              <h1 className="sectionTitle skyblue">
                ※등록회원의 담당 관리자를 선택해 주세요.
              </h1>
            </section>
            <section className="sectionBlock margin-top-10">
              <table className="table">
                <colgroup>
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="*" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="textCenter">No.</th>
                    <th className="textCenter">아이디</th>
                    <th className="textCenter">이름</th>
                    <th className="textCenter">전화번호</th>
                    <th className="textCenter">구분</th>
                    <th className="textCenter">소속</th>
                    <th className="textCenter">직책</th>
                    <th className="textCenter">등록일</th>
                    <th className="textCenter">선택</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>

              <div className="tablePagination clear">
                <div className="btnLeft">
                  <button className="btn btn-gray btn-first ir" type="button">
                    첫 페이지
                  </button>
                  <button className="btn btn-gray btn-prev ir" type="button">
                    이전 페이지
                  </button>
                </div>
                <div className="btnCenter">
                  <button className="btn btn-gray" type="button">
                    1
                  </button>
                  <button className="btn btn-gray active" type="button">
                    2
                  </button>
                </div>

                <div className="btnRight">
                  <button className="btn btn-gray btn-next ir" type="button">
                    다음 페이지
                  </button>
                  <button className="btn btn-gray btn-last ir" type="button">
                    끝 페이지
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
export default UserInsert;
