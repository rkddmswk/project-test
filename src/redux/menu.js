// redux에서 관리하는 초기화 상태
const initialState = {
  selectedMenu: "", // 선택한 헤더 메뉴
  selectedMenuNav: "", // 선택한 네비바 메뉴
  menuItems: [], // 메뉴목록
  userList: [], // 회원 목록
};

// 액션 타입
const MENU_NAME = "MENU_NAME"; // 메뉴명
const MENU_LIGHT = "MENU_LIGHT"; // 선택한 헤더메뉴
const MENU_NAV_LIGHT = "MENU_NAV_LIGHT"; // 선택한 네비바메뉴
const USER_LIST = "USER_LIST"; // 회원목록
const USER_DELETE = "USER_DELETE"; // 삭제 액션 타입

export const menuName = (data) => ({ type: MENU_NAME, data }); // 메뉴명
export const menuLight = (menuId) => ({ type: MENU_LIGHT, menuId }); // 헤더 하이라이트
export const menuNavLight = (menuId) => ({ type: MENU_NAV_LIGHT, menuId }); // 네비 하이라이트
export const userList = (data) => ({ type: USER_LIST, data }); // 회원목록
export const deleteUser = (key) => ({ type: USER_DELETE, key }); // 삭제된 회원

function menu(state = initialState, action) {
  switch (action.type) {
    case MENU_NAME:
      // console.log("MENU_NAME action.data:", action.data);
      return {
        ...state,
        menuItems: action.data,
      };
    case MENU_LIGHT:
      return {
        ...state,
        selectedMenu: action.menuId,
      };
    case MENU_NAV_LIGHT:
      console.log("menuNavLight action.data:", action.data);
      return {
        ...state,
        selectedMenuNav: action.menuId,
      };
    case USER_LIST:
      console.log("USER_LIST action.data:", action.data);
      return {
        ...state,
        userList: action.data, // 사용자 정보 업데이트
      };
    case USER_DELETE:
      console.log("USER_DELETE action.data:", action.key);

      return {
        ...state,
        userList: state.userList.filter((user) => user.key !== action.key),
      };
    default:
      return state;
  }
}

export default menu;
