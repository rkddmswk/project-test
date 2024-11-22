import Header from "./header/header";
import Nav from "./nav/nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      {/* 사이드바 */}
      <Nav />
      <div id="contentsArea">
        {/* 헤더 */}
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
