import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuLight, menuName } from "../../redux/menu";
import { logOut } from "../../redux/user";
import api from "../../api/api";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 리덕스 스토어에서 현재 상태를 가져와서 업데이트 처리된다.
  const user = useSelector((state: any) => state.user.user); // 로그인
  const menuItems = useSelector((state: any) => state.menu.menuItems); // 메뉴
  const lightMenu = useSelector((state: any) => state.menu.selectedMenu); // 선택된메뉴

  // 화면진입시 실행
  // useEffect(() => {
  //   // console.log(menuItems.length);
  //   if (menuItems.length) {
  //     menuHandler();
  //   }
  // }, []);

  useEffect(() => {
    menuHandler();
  }, []);

  const menuHandler = () => {
    api
      .get("https://localhost:3000/api/menuName")
      .then((res) => {
        console.log(res.data.data);
        const menuData = res.data.data;
        if (menuData) {
          // Redux에 메뉴명 저장
          dispatch(menuName(menuData));
          // 세션 스토리지에 메뉴명 저장
          // localStorage.setItem("menuData", JSON.stringify(menuData));
        }
      })
      .catch((error) => {
        console.log("Login failed", error);
      });
  };

  // 선택한 메뉴 하이라이트
  const handleMenuClick = (menuId: any) => {
    // console.log(menuId);
    dispatch(menuLight(menuId));
  };

  // 로그아웃
  const handleLogoutController = async () => {
    alert("로그아웃되었습니다.");
    dispatch(logOut());
    sessionStorage.removeItem("userData"); // 세션 스토리지에서 사용자 정보 삭제
    navigate("/");
  };

  return (
    <section id="sectionHeader">
      <div className="left clearfix">
        <nav className="headerTopNav">
          <ul>
            {menuItems.map((item: any, index: number) => (
              <li key={index}>
                <a
                  href={item.url}
                  className={lightMenu === item.menuId ? "active" : ""}
                  onClick={() => {
                    handleMenuClick(item.menuId);
                  }}
                >
                  {item.menuNm}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="right clearfix">
        <div className="profile left">
          <a>
            <span>
              <strong>{user.name}</strong> 님, 반갑습니다.
            </span>
          </a>
        </div>
        <div
          className="profile right"
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <a href="./login.html"> */}
          <LogoutIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={handleLogoutController}
          />
          {/* </a> */}
        </div>
      </div>
    </section>
  );
};

export default Header;
