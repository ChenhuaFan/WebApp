import config from "./config/firebase/fbConfig";
import * as firebase from "firebase/app";
import "firebase/auth"
import { message } from "antd";
import { userStore } from './stores';
import { setFirebaseUserAction, resetUserState } from './actions/userAction';

firebase.initializeApp(config)

// set firebase user watcher
firebase.auth().onAuthStateChanged(
  (user: firebase.User | null): void => {
    if (user) {
      // firebase user is signed in.
      // TODO: login phase II.
      message.success(`账号验证成功：${user.uid}`);
      // dispatch redux action to set firebase user object.
      console.log(userStore.getState());
      userStore.dispatch(setFirebaseUserAction(user));
      console.log(userStore.getState());
    } else {
      // User is signed out.
      message.info(`您已退出登录`);
      userStore.dispatch(resetUserState());
    }
  }
);

const t = {
  firebase,
  VERIFIED_ID: 'get-captcha-button'
}

export default t;