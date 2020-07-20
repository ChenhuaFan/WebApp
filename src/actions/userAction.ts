import { UserInfo } from "../stores/userState"

export enum UserActionTypes {
  SET_FIREBASE_USER = "user/setFirebaseUser",
  SET_USERINFO = "user/setUserInfo",
  RESET_USERSTATE = "user/resetUserState"
}

export interface UserAction {
  type: string;
  payload?: any;
}

export const setFirebaseUserAction = (fbUser: firebase.User): UserAction => {
  return {
    type: UserActionTypes.SET_FIREBASE_USER,
    payload: fbUser
  }
}

export const setUserInfoAction = (userInfo: UserInfo): UserAction => {
  return {
    type: UserActionTypes.SET_USERINFO,
    payload: userInfo
  }
}

export const resetUserState = (): UserAction => {
  return {
    type: UserActionTypes.RESET_USERSTATE
  }
}

export const userActionCreator = (type: UserActionTypes, payload: any): UserAction => {
  return {
    type,
    payload
  }
}