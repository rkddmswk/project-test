import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuLight, menuNav } from "../../redux/menu";
import { menuUrl } from "../../utils/menu-url";
import { logOut, setUser } from "../../redux/user";

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dispatch(menuNav(menuUrl));
  const menuName = useSelector((state: any) => state.menu.menuItems); // 메뉴
  const lightMenu = useSelector((state: any) => state.menu.selectedMenu); // 선택된메뉴
  const user = useSelector((state: any) => state.user.user); // 로그인

  useEffect(() => {
    dispatch(menuNav(menuUrl));
  }, [dispatch]);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser))); // Redux 상태에 사용자 정보 저장
    }
  }, [dispatch]); // dispatch에 의존

  const handleLogoutController = async () => {
    alert("로그아웃되었습니다.");
    dispatch(logOut());
    sessionStorage.removeItem("user"); // 세션 스토리지에서 사용자 정보 삭제
    navigate("/");
  };

  const handleMenuClick = (menuId: any) => {
    console.log(menuId);
    setSelectedMenu(menuId);
    dispatch(menuLight(menuId));
  };

  return (
    <section id="sectionHeader">
      <div className="left clearfix">
        <nav className="headerTopNav">
          <ul>
            {menuName.map((item: any, index: number) => (
              <li key={index}>
                <a
                  href={item.url}
                  className={lightMenu === item.menuId ? "active" : ""}
                  // className={lightMenu.includes(item.menuId) ? "active" : ""}
                  onClick={(e) => {
                    // e.preventDefault();
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
