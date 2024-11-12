import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Main from "./component/main/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
