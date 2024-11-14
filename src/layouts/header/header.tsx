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
import { useState } from "react";
import { Add, List, PersonAdd, ChangeHistory } from "@mui/icons-material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import menuUrl from "../../utils/menu-url";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../../redux/user";
import { persistor } from "../../redux";

const Header = () => {
  const [lights, setLights] = useState(0);
  const handleChange = (e: any, newValue: number) => {
    setLights(newValue);
  };
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state: any) => state.user?.user?.name || "");
  console.log(username);

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
            {menuUrl.map((item) => (
              <li>
                <a
                  href={item.url}
                  className={pathname === item.url ? "active" : ""}
                >
                  {item.topmenu}
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
              <strong>{username}</strong> 님, 반갑습니다.
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
