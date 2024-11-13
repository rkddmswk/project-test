const Layout = () => {
  return (
    <>
      {/* header start */}
      <header id="header">
        <h1 className="logo ir"></h1>
        <nav className="headerNav">
          <h2 className="sr-only">메뉴 리스트</h2>
          <ul className="depth1">
            <li>
              <button className="iconCompany active" type="button">
                홈
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {/* header end */}
    </>
  );
};

export default Layout;
