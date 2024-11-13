import { useLocation } from "react-router-dom";
import navUrl from "../../utils/nav-url";

const Nav = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {/* header start */}
      <header id="header">
        <h1 className="logo ir"></h1>
        <nav className="headerNav">
          <h2 className="sr-only">메뉴 리스트</h2>
          <ul className="depth1">
            <li>
              {pathname === "/main" ? (
                <button className="iconCompany active" type="button">
                  홈
                </button>
              ) : (
                <button className="iconCompany active" type="button">
                  회원관리
                </button>
              )}
              {pathname === "/users" &&
                navUrl.map((item) => (
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
                ))}
              {pathname === "/userInsert" &&
                navUrl.map((item) => (
                  <ul className="depth2" style={{ display: "block" }}>
                    <li>
                      <a href={item.url}>{item.name}</a>
                    </li>
                  </ul>
                ))}
            </li>
          </ul>
        </nav>
      </header>
      {/* header end */}
    </>
  );
};

export default Nav;
