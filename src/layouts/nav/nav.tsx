import { useLocation, useNavigate } from "react-router-dom";
import { menuUrl } from "../../utils/menu-url";
import menu, { menuNav, menuNavLight } from "../../redux/menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Nav = () => {
  // const location = useLocation();
  // const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(menuNav(menuUrl));
  const menuName = useSelector((state: any) => state.menu.menuItems);
  const lightMenu = useSelector((state: any) => state.menu.selectedMenu);
  const lightMenuNav = useSelector((state: any) => state.menu.selectedMenuNav);

  const handleMenuClick = (menuId: any, childUrl: any) => {
    console.log(menuId);
    navigate(childUrl);
    dispatch(menuNavLight(menuId));
  };

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
            {menuName
              .filter((item: any) => item.menuId === lightMenu)
              .map((item: any) => (
                <li key={item.menuId}>
                  <button className={lightMenu === item.menuId ? "active" : ""}>
                    {" "}
                    {item.menuNm}
                  </button>
                  {item.child && item.child.length > 0 && (
                    <ul className="depth2" style={{ display: "block" }}>
                      {item.child.map((child: any) => (
                        <li key={child.menuId}>
                          <button
                            className={
                              lightMenuNav === child.menuId ? "active" : ""
                            }
                            onClick={() => {
                              handleMenuClick(child.menuId, child.url);
                              // navigate(child.url);
                            }}
                            style={{
                              fontSize: "13px",
                              paddingLeft: "20px",
                              height: "60px",
                              lineHeight: "60px",
                              // color: "#979da6",
                              letterSpacing: 0,
                              color:
                                lightMenuNav === child.menuId
                                  ? "white"
                                  : "#979da6",
                            }}
                          >
                            {child.menuNm}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </nav>
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
