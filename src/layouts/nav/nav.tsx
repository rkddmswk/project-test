import { useLocation, useNavigate } from "react-router-dom";
import { menuUrl } from "../../utils/menu-url";
import menu, { menuNav } from "../../redux/menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Nav = () => {
  // const location = useLocation();
  // const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(menuNav(menuUrl));
  const menuName = useSelector((state: any) => state.menu.user);
  const lightMenu = useSelector((state: any) => state.menu.selectedMenu);

  const filterMenu = menuName
    .filter((item: any) => {
      if (lightMenu === 1 && item.menuId === 2) return false; // 홈일 때 회원관리 숨김
      if (lightMenu === 2 && item.menuId === 1) return false; // 회원관리일 때 홈 숨김
      return true;
    })
    .map((item: any) => {
      const isActive = lightMenu === item.menuId;
      return (
        <li key={item.menuId}>
          <button
            className={isActive ? "active" : ""}
            onClick={() => navigate(item.url)}
          >
            {item.menuNm}
          </button>
          {isActive && item.child && item.child.length > 0 && (
            <ul className="depth2">
              {item.child.map((item: any) => (
                <li
                  key={item.menuId}
                  className={`iconCompany ${
                    lightMenu === item.menuId ? "active" : ""
                  }`}
                >
                  <a href={item.url}>{item.menuNm}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });

  return (
    <>
      {/* header start */}
      <header id="header">
        <h1
          className="logo ir"
          onClick={() => navigate("/main")}
          style={{ cursor: "pointer" }}
        ></h1>
        {/* <nav className="headerNav">
          <h2 className="sr-only">메뉴 리스트</h2>
          <ul className="depth1">
            {filterMenu}
            {filterMenu.map((item: any) => (
              <li key={item.menuId}>
                <button
                  className={lightMenu === item.menuId ? "active" : ""}
                  onClick={() => navigate(item.url)}
                >
                  {item.menuNm}
                </button>
              </li>
            ))}
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
        </nav> */}
      </header>
      {/* header end */}
    </>
  );
};

export default Nav;
