import { useEffect } from "react";
import Header from "./header/header";
import Nav from "./nav/nav";
import { useSelector } from "react-redux";

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
