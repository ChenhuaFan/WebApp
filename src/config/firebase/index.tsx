import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1dv6CI2MbPEEZkJLYXnurxsIp5rPXAEs",
  authDomain: "tencenttars.firebaseapp.com",
  databaseURL: "https://tencenttars.firebaseio.com",
  projectId: "tencenttars",
  storageBucket: "tencenttars.appspot.com",
  messagingSenderId: "515114010085",
  appId: "1:515114010085:web:d88f86dbd75e5586d85b0c",
  measurementId: "G-28SJCYVX8B"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

