// firebase
import config from "./config/firebase/fbConfig";
import * as firebase from "firebase/app";
import "firebase/auth"
// react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// redux
import { Provider } from 'react-redux';
import { rentHouseStore } from './stores';
import { setFirebaseUserAction, resetUserState } from './actions/userAction';

// init firebase auth
firebase.initializeApp(config)
// set firebase user watcher
firebase.auth().onAuthStateChanged(
  (user: firebase.User | null): void => {
    if (user) {
      rentHouseStore.dispatch(setFirebaseUserAction(user));
    } else {
      rentHouseStore.dispatch(resetUserState());
    }
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rentHouseStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
