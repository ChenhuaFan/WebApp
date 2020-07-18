import { UserState } from "../stores/userState";
import { UserAction, UserActionTypes } from "../actions/userAction";

const initialState = new UserState();

export const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    // set new Firebase User Object.
    case UserActionTypes.SET_FIREBASE_USER:
      return new UserState(action.payload, state.userInfo);
    // set new UserInfo Object.
    case UserActionTypes.SET_USERINFO:
      return new UserState(state.fbUser, action.payload);
    // reset User state to initial.
    case UserActionTypes.RESET_USERSTATE:
      return new UserState();
    // default: return unchanged state.
    default:
      return state;
  }
}