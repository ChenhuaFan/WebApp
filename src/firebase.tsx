import * as firebase from "firebase";
import config from "./config/firebase/fbConfig";

firebase.initializeApp(config)

const t = {
  firebase,
  VERIFIED_ID: 'get-captcha-button'
}

export default t;