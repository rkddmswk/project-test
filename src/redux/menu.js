// redux에서 관리하는 초기화 상태
const initialState = {
  // user: {
  //   id: "",
  //   passWord: "",
  //   name: "",
  //   phone: "",
  //   address: "",
  //   coin: 0,
  //   update: "",
  //   lastDate: "",
  // },
  selectedMenu: "",
  menuItems: [],
  userList: [], // 회원 목록
};

// 액션 타입
// const SET_USER = "SET_USER";
// const USER_INFO = "USER_INFO";
// const LOG_OUT = "LOG_OUT";
const MENU_NAV = "MENU_NAV";
const MENU_LIGHT = "MENU_LIGHT";
const USER_LIST = "USER_LIST"; // 회원목록
const USER_DELETE = "USER_DELETE"; // 삭제 액션 타입

export const menuNav = (data) => ({ type: MENU_NAV, data }); // 메뉴
export const menuLight = (menuId) => ({ type: MENU_LIGHT, menuId }); // 하이라이트
export const userList = (data) => ({ type: USER_LIST, data }); // 회원목록
export const deleteUser = (key) => ({ type: USER_DELETE, key });

function menu(state = initialState, action) {
  switch (action.type) {
    case MENU_NAV:
      // console.log("MENU_NAV action.data:", action.data);
      return {
        ...state,
        menuItems: action.data, // 메뉴관련 상태업데이트
      };
    case MENU_LIGHT:
      return {
        ...state,
        selectedMenu: action.menuId, // 선택된 메뉴 업데이트
      };
    case USER_LIST:
      console.log("USER_LIST action.data:", action.data);
      return {
        ...state,
        userList: action.data, // 사용자 정보 업데이트
      };
    case USER_DELETE:
      console.log("USER_DELETE action.data:", action.key);
      // 사용자를 삭제한 후, userList가 비어 있으면 초기화 상태로 변경
      // const updatedUserList = state.userList.filter(
      //   (user) => user.key !== action.key
      // );
      // console.log(updatedUserList);

      return {
        ...state,
        userList: state.userList.filter((user) => user.key !== action.key),
        // userList: action.data, // 사용자 정보 업데이트
        // userList: state.userList.filter((user) => user.key !== action.key),
        // action.key에 해당하지 않는 사용자만 유지
      };
    default:
      return state;
  }
}

export default menu;
