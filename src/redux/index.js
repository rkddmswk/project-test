import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["user"],
  // blacklist -> 그것만 제외합니다
};

export const rootReducer = combineReducers({
  // auth,
  // board,
  user,
});

// persistReducer로 리듀서를 감싸서 내보냄
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore를 사용하여 Redux 스토어를 생성
const store = configureStore({
  reducer: persistedReducer, // persist된 rootReducer를 설정
});

export default store;
