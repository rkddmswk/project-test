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

const Header = () => {
  const [lights, setLights] = useState(0);
  const handleChange = (e: any, newValue: number) => {
    setLights(newValue);
  };
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const username = useSelector((state: any) => state.user.user.name);

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
                  {item.name}
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
        <div className="profile right" onClick={() => navigate("/")}>
          {/* <a href="./login.html"> */}
          <img src="./img/ic_logout.png" />
          {/* </a> */}
        </div>
      </div>
    </section>
  );
};

export default Header;
