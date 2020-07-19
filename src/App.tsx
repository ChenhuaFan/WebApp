// react
import React from 'react';
import LoginContainer from './views/LoginContainer';
import RegisterContainer from './views/RegisterContainer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserPhase } from './enums/Entrance';
// firebase
import * as firebase from "firebase/app";
import "firebase/auth";
// redux
import { userStore } from './stores';
// init antd
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './config/styles/App.less';
moment.locale('zh-cn');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route
              exact={true}
              path="/login"
              render={
                ({ location }) => {
                  /*
                    firebase auth is a async function, so we can only check user state by sessionStorage.
                  */
                  if (!sessionStorage.getItem("uuid")) {
                    return <LoginContainer />;
                  }
                  if (!sessionStorage.getItem("userInfo")) {
                    return <Redirect to={{ pathname: "/register", state: { from: location } }} />
                  }
                  return <Redirect to={{ pathname: "/", state: { from: location } }} />
                }
              }
            />
            <Route
              exact={true}
              path="/register"
              render={
                ({ location }) => {
                  /*
                    firebase auth is a async function, so we can only check user state by sessionStorage.
                  */
                  console.log(firebase.auth().currentUser);
                  if (!sessionStorage.getItem("uuid")) {
                    return <RegisterContainer step={UserPhase.PHASE_I} />
                  }
                  if (!sessionStorage.getItem("userInfo")) {
                    return <RegisterContainer step={UserPhase.PHASE_II} />
                  }
                  return <Redirect to={{ pathname: "/", state: { from: location } }} />
                }
              }
            />
            <Route exact={true} path="/" render={() => <p>主页</p>} />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    );
  }
}

export default App;
