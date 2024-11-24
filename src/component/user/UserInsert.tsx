import { useState } from "react";
// import Header from "../../layouts/header/header";
// import Nav from "../../layouts/nav/nav";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userList } from "../../redux/menu";

const UserInsert = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userUpdate, setUserUpdate] = useState("");
  const [userCoin, setUserCoin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 데이터 리로드(원본)
  // localStorage.setItem("userList", JSON.stringify(testData));

  // 회원정보저장버튼
  const handleSaveController = () => {
    api
      .post("https://localhost:3000/api/userInsert", {
        id: userId,
        password: userPassword,
        name: userName,
        phone: userPhone,
        address: userAddress,
        coin: userCoin,
        update: userUpdate,
      })
      .then((res) => {
        console.log(res.data.data);
        const userInfoData = res.data.data;
        // 호출 성공 시 데이터 값을 Redux 상태에 저장
        dispatch(userList(userInfoData));

        // 로컬 스토리지에 사용자 정보 저장
        // localStorage.setItem("userList", JSON.stringify(userInfoData));

        navigate("/users");
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  };

  return (
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
                          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
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
                <td className="label">지갑주소</td>
                <td>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="지갑주소를 입력해주세요"
                    value={userAddress}
                    maxLength={15}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">코인잔액</td>
                <td>
                  <input
                    id="coin"
                    name="coin"
                    type="text"
                    placeholder="코인잔액을 입력해주세요"
                    value={userCoin}
                    maxLength={15}
                    onChange={(e) => setUserCoin(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">등록일</td>
                <td>
                  <input
                    id="update"
                    name="update"
                    type="text"
                    placeholder="등록일자를 입력해주세요"
                    value={userUpdate}
                    maxLength={15}
                    onChange={(e) => setUserUpdate(e.target.value)}
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
    </main>
  );
};
export default UserInsert;
