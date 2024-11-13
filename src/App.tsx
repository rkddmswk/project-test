import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Main from "./component/main/Main";
import User from "./component/user/User";
import UserInsert from "./component/user/UserInsert";
import Header from "./layouts/header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/userInsert" element={<UserInsert />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
