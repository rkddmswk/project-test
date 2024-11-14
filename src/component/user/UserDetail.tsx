import { useNavigate, useParams } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Nav from "../../layouts/nav/nav";
import { useEffect, useState } from "react";
import api from "../../api/api";

interface UserInfoDetail {
  id: string;
  name: string;
  passWord: string;
  phone: string;
  update: string;
  coin: number;
  address: string;
  lastDate: string;
}

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 게시물 번호
  console.log("id : ", id);
  const [userInfoData, setUserInfoData] = useState<UserInfoDetail>();
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");

  useEffect(() => {
    api
      .post("https://localhost:3000/api/userInfo/userDetail", {
        key: id,
      })
      .then((res) => {
        console.log(res.data.userInfoDetail);
        setUserInfoData(res.data.userInfoDetail);
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <Nav />
        <div id="contentsArea">
          <Header />
          <main>
            <section className="sectionBlock noBorder">
              <h1 className="subTitle">{`회원목록 > 상세정보`}</h1>
            </section>

            <section className="sectionBlock noBorder">
              <div className="editSectionBlock">
                <table className="editTable table-border">
                  <colgroup>
                    <col width="200px" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td className="label">아이디</td>
                      <td>{userInfoData?.id}</td>
                    </tr>
                    <tr>
                      <td className="label">이름</td>
                      <td>
                        <input
                          id="nm"
                          name="nm"
                          type="text"
                          placeholder={userInfoData?.name}
                          maxLength={5}
                          value={regName || ""}
                          onChange={(e) =>
                            setRegName(
                              e.target.value.replace(/[^ㄱ-ㅎ가-힣ㆍ ᆢ]/gi, "")
                            )
                          }
                          // maxlength="10"
                          // value="개발자"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">전화번호</td>
                      <td>
                        <input
                          id="pn"
                          name="pn"
                          type="tel"
                          // maxlength="11"
                          // value="010-2323-4545"
                          placeholder={userInfoData?.phone}
                          className="numOnly"
                          value={regPhone}
                          maxLength={13}
                          onChange={(e) =>
                            setRegPhone(
                              e.target.value
                                .replace(/[^0-9]/g, "")
                                .replace(
                                  /^(\d{0,3})(\d{0,4})(\d{0,4})$/g,
                                  "$1-$2-$3"
                                )
                                .replace(/(\-{1,2})$/g, "")
                              // .replace(
                              //   /^(\d{2,3})(\d{3,4})(\d{4})$/,
                              //   `$1-$2-$3`
                              // )
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">지갑주소</td>
                      <td>{userInfoData?.address}</td>
                    </tr>
                    <tr>
                      <td className="label">관리자 (소속/이름/아이디)</td>
                      <td>영업1팀 / 김길동 (manager10)</td>
                    </tr>
                    <tr>
                      <td className="label">코인잔액</td>
                      <td>{`${userInfoData?.coin} SUM`}</td>
                    </tr>
                    <tr>
                      <td className="label">등록일</td>
                      <td>{userInfoData?.update}</td>
                    </tr>
                    <tr>
                      <td className="label">최종접속 일</td>
                      <td>{userInfoData?.lastDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="sectionBlock noBorder margin-top-15">
              <div className="left">
                <button
                  className="btn btn-big btn-color-back"
                  type="button"
                  id="userListBtn"
                  onClick={() => navigate(-1)}
                >
                  이전
                </button>
              </div>
              <div className="right">
                <button
                  className="btn btn-big btn-color-link margin-right-6"
                  type="button"
                  id="tradeListBtn"
                >
                  거래내역
                </button>
                <button
                  className="btn btn-big btn-color-save"
                  type="button"
                  id="saveBtn"
                >
                  저장
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
export default UserDetail;
