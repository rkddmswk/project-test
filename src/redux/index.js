import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/es/storage/session";
import user from "./user";

// 로컬스토리지와 세션스토리지 각각의 설정을 정의
const persistConfigLocal = {
  key: "root-local",
  storage: storage, // localStorage 사용
  whitelist: ["user"], // user 리듀서만 localStorage에 저장
};

const persistConfigSession = {
  key: "root-session",
  storage: storageSession, // sessionStorage 사용
  whitelist: [], // 세션에 저장할 리듀서 지정 (예: 세션 관련 상태)
};

export const rootReducer = combineReducers({
  // auth,
  // board,
  user,
});

// 두 개의 persistReducer를 사용하여 각 스토리지에 저장
const persistedReducerLocal = persistReducer(persistConfigLocal, rootReducer);
// configureStore를 사용하여 Redux 스토어를 생성
const storeLocal = configureStore({
  reducer: persistedReducerLocal, // persist된 rootReducer를 설정
});

const persistedReducerSession = persistReducer(
  persistConfigSession,
  rootReducer
);
const storeSession = configureStore({
  reducer: persistedReducerSession, // 세션스토리지 관련 리듀서
});

// store로부터 persistor 생성
export const persistor = persistStore(storeLocal);

export { storeLocal, storeSession };
