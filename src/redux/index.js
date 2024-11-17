import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/es/storage/session";
import menu from "./menu";
import user from "./user";

// 로컬스토리지와 세션스토리지 각각의 설정을 정의
const persistConfig = {
  key: "root",
  storage: storage, // localStorage 사용
  whitelist: ["menu"], // menu 리듀서만 localStorage에 저장
  blacklist: ["user"], // user는 제외 (세션스토리지에서 관리)
};

export const rootReducer = combineReducers({
  // auth,
  // board,
  user,
  menu,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// configureStore를 사용하여 Redux 스토어를 생성
const store = configureStore({
  reducer: persistedReducer, // persist된 rootReducer를 설정
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);
// // store로부터 persistor 생성
// export const persistor = persistStore(storeLocal);
// export const persistorSession = persistStore(storeSession);

export { store, persistor };
