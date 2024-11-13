import { Box, Typography } from "@mui/material";
import Header from "../../layouts/header/Header";
import Nav from "../../layouts/nav/nav";

const Main = () => {
  return (
    <>
      <div className="container">
        <Nav />
        {/* contentsArea */}
        <div id="contentsArea">
          <Header />
          <main>
            {/* 회원현황 */}
            <section className="sectionBlock">
              <div className="homeSectionBlock">
                <h1>
                  <img src="./img/ico-home-member.png" />
                  회원 현황
                </h1>
                <div className="dashInfo">
                  <div>최근 한 달 가입회원</div>
                  <p>
                    24 <span>명</span>
                  </p>
                </div>
                <div className="dashInfo">
                  <div>
                    총 회원{" "}
                    <button
                      className="btn btn-small btn-xs right"
                      type="button"
                      id="userListBtn"
                    >
                      바로가기
                    </button>{" "}
                  </div>
                  <p>
                    391 <span>명</span>
                  </p>
                </div>
                <div className="dashInfo">
                  <div>오늘 접속 회원</div>
                  <p>
                    167 <span>명</span>
                  </p>
                </div>
                <div className="dashInfo">
                  <div>거래 제한 중인 회원</div>
                  <p>
                    3 <span>명</span>
                  </p>
                </div>
              </div>
            </section>

            {/* 코인현황 */}
            <section className="sectionBlock">
              <div className="homeSectionBlock">
                <h1>
                  <img src="./img/ico-home-coin.png" />
                  코인 현황
                </h1>
                <div className="dashInfo">
                  <div>브릿지 코인지갑 현재 총 잔액</div>
                  <p>
                    500,000 <span>sum</span>
                  </p>
                </div>
                <div className="dashInfo">
                  <div>회원 보유 총 잔액</div>
                  <p>
                    400,000 <span>sum</span>
                  </p>
                </div>
                <div className="dashInfo">
                  <div>오늘 총 거래 건수</div>
                  <p>
                    35 <span>건</span>
                  </p>
                </div>
                <div className="dashInfo">
                  <div>오늘 총 거래코인</div>
                  <p>
                    15,000 <span>sum</span>
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
