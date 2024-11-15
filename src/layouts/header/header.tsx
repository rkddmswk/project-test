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
import { logOut, menuLight, menuNav } from "../../redux/user";
import { persistor } from "../../redux";
import { menuUrl } from "../../utils/menu-url";

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const menuname = useSelector((state: any) => state.user?.user?.name || "");
  dispatch(menuNav(menuUrl));
  const menuName = useSelector((state: any) => state.user.user);
  const lightMenu = useSelector((state: any) => state.user.selectedMenu);

  const handleMenuClick = (menuId: any) => {
    console.log(menuId);
    setSelectedMenu(menuId);
    dispatch(menuLight(menuId));
  };

  const handleLogoutController = async () => {
    alert("로그아웃되었습니다.");

    dispatch(logOut());
    // persistor.pause(); // Redux Persist 상태 저장 멈추기
    await persistor.flush(); // 남아 있는 데이터 비우기
    await persistor.purge(); // Persisted storage 삭제

    navigate("/");
  };

  return (
    <section id="sectionHeader">
      <div className="left clearfix">
        <nav className="headerTopNav">
          <ul>
            {menuName.map((item: any) => (
              <li>
                <a
                  href={item.url}
                  className={lightMenu === item.menuId ? "active" : ""}
                  // className={lightMenu.includes(item.menuId) ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
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
              <strong></strong> 님, 반갑습니다.
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
