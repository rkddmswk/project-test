import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Main from "./component/main/Main";
import User from "./component/user/User";
import UserInsert from "./component/user/UserInsert";
import UserDetail from "./component/user/UserDetail";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "./redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  // Redux store 생성\
  const persistor = persistStore(store); // redux-persist 설정

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/main" element={<Main />}></Route>
              <Route path="/users" element={<User />}></Route>
              <Route
                path="/users/usersDetail/:id"
                element={<UserDetail />}
              ></Route>
              <Route path="/userInsert" element={<UserInsert />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
};

export default App;
