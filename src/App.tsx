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
import { store, persistor } from "./redux";
import Layout from "./layouts";
const App = () => {
  // Redux store 생성
  const persistorLocal = persistStore(store); // 로컬 스토리지를 위한 persistor

  return (
    <RecoilRoot>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/main"
                element={
                  <Layout>
                    <Main />
                  </Layout>
                }
              />
              <Route
                path="/users"
                element={
                  <Layout>
                    <User />
                  </Layout>
                }
              />
              <Route
                path="/users/usersDetail/:id"
                element={
                  <Layout>
                    <UserDetail />
                  </Layout>
                }
              />
              <Route
                path="/userInsert"
                element={
                  <Layout>
                    <UserInsert />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </RecoilRoot>
  );
};

export default App;
