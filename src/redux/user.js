// redux에서 관리하는 초기화 상태
const initialState = {
  user: {
    id: "",
    passWord: "",
    name: "",
    phone: "",
    address: "",
    coin: 0,
    update: "",
    lastDate: "",
  },
};

// 액션 타입
const SET_USER = "SET_USER";
const USER_INFO = "USER_INFO";
const LOG_OUT = "LOG_OUT";

// 액션 함수
export const setUser = (data) => ({ type: SET_USER, data });
export const userInfo = (data) => ({ type: USER_INFO, data });
export const logOut = () => ({ type: LOG_OUT });

function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log("SET_USER action.data:", action.data);
      return {
        ...state,
        user: action.data,
      };
    case LOG_OUT:
      console.log("LOG_OUT action.data:", action.data);
      return {
        ...initialState,
      };
    case USER_INFO:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}

export default user;
