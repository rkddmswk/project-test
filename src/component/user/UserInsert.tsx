import Header from "../../layouts/header/Header";
import Nav from "../../layouts/nav/nav";

const UserInsert = () => {
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
                          // maxlength="50"
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
                          // maxlength="25"
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
                          value=""
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
