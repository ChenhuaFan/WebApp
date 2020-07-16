import * as firebase from "firebase";
import config from "./config/firebase/fbConfig";
import { message } from "antd";

firebase.initializeApp(config)

// set firebase user watcher
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // firebase user is signed in.
    // TODO: login phase II.
    message.success(`账号验证成功：${user.uid}`);
    // dispatch redux action
    
  } else {
    // User is signed out.
    message.info(`您已退出登录`);
  }
});

const t = {
  firebase,
  VERIFIED_ID: 'get-captcha-button'
}

export default t;