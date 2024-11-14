// redux에서 관리하는 초기화 상태
const initialState = {
  id: "",
  name: "",
  email: "",
};

// 액션 타입
const SET_USER = "SET_USER";

// 액션 함수
export const setUser = (data) => ({ type: SET_USER, data });

function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}

export default user;
