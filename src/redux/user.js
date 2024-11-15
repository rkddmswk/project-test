// redux에서 관리하는 초기화 상태
const initialState = {
  id: "",
  passWord: "",
  name: "",
  phone: "",
  address: "",
  coin: 0,
  update: "",
  lastDate: "",
  selectedMenu: "", // 선택된 메뉴
};

// 액션 타입
const SET_USER = "SET_USER";
const USER_INFO = "USER_INFO";
const LOG_OUT = "LOG_OUT";
const MENU_NAV = "MENU_NAV";
const MENU_LIGHT = "MENU_LIGHT";

// 액션 함수
export const setUser = (data) => ({ type: SET_USER, data });
export const userInfo = (data) => ({ type: USER_INFO, data });
export const logOut = () => ({ type: LOG_OUT });
export const menuNav = (data) => ({ type: MENU_NAV, data }); // 메뉴
export const menuLight = (menuId) => ({ type: MENU_LIGHT, menuId }); // 하이라이트

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
    case MENU_NAV:
      return {
        ...state,
        user: action.data,
      };
    case MENU_LIGHT:
      return {
        ...state,
        selectedMenu: action.menuId,
      };
    default:
      return state;
  }
}

export default user;
