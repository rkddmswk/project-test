// redux에서 관리하는 초기화 상태
const initialState = {
  user: {
    id: "",
    passWord: "",
    name: "",
    // phone: "",
    // address: "",
    // coin: 0,
    // update: "",
    // lastDate: "",
  },
};

// 액션 타입
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

// 액션 함수
export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
  // data,
});
export const logOut = () => ({ type: LOG_OUT });

function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      // console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      // console.log("LOG_OUT action.data:", action.data);
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default user;
