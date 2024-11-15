import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Main from "./component/main/Main";
import User from "./component/user/User";
import UserInsert from "./component/user/UserInsert";
import UserDetail from "./component/user/UserDetail";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { storeLocal, storeSession } from "./redux";
const App = () => {
  // Redux store 생성\
  const persistorLocal = persistStore(storeLocal); // 로컬 스토리지를 위한 persistor
  const persistorSession = persistStore(storeSession); // 세션 스토리지를 위한 persistor

  return (
    <RecoilRoot>
      <Provider store={storeLocal}>
        <PersistGate loading={null} persistor={persistorLocal}>
          <BrowserRouter>
            <Routes>
              <Route path="/main" element={<Main />}></Route>
              <Route path="/users" element={<User />}></Route>
              <Route
                path="/users/usersDetail/:id"
                element={<UserDetail />}
              ></Route>
              <Route path="/userInsert" element={<UserInsert />}></Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>

      <Provider store={storeSession}>
        <PersistGate loading={null} persistor={persistorSession}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </RecoilRoot>
  );
};

export default App;
