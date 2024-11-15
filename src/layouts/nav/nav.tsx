import { useLocation, useNavigate } from "react-router-dom";
import navUrl from "../../utils/nav-url";
import path from "path";
// import menuUrl from "../../utils/menu-url";

const Nav = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  return (
    <>
      {/* header start */}
      <header id="header">
        <h1
          className="logo ir"
          onClick={() => navigate("/main")}
          style={{ cursor: "pointer" }}
        ></h1>
        <nav className="headerNav">
          <h2 className="sr-only">메뉴 리스트</h2>
          <ul className="depth1">
            <li>
              {/* {menuUrl
                .filter((item) => item.url === "/main")
                .map((item) => (
                  <button className="iconCompany active" type="button">
                    {item}
                  </button>
                ))} */}
              {pathname === "/main" ? (
                <button className="iconCompany active" type="button">
                  홈
                </button>
              ) : (
                <button className="iconCompany active" type="button">
                  회원관리
                </button>
              )}
              {pathname !== "/main"
                ? navUrl.map((item) => (
                    <ul className="depth2" style={{ display: "block" }}>
                      <li>
                        <a
                          href={item.url}
                          className={pathname === item.url ? "active" : ""}
                        >
                          {item.name}
                        </a>
                      </li>
                    </ul>
                  ))
                : null}
            </li>
          </ul>
        </nav>
      </header>
      {/* header end */}
    </>
  );
};

export default Nav;
