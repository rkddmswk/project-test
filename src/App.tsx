import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Main from "./component/main/Main";
import Layout from "./layouts";
import User from "./component/user/User";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/users" element={<User />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
