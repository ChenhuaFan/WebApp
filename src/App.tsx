// react
import React from 'react';
import LoginContainer from './views/LoginContainer';
import RegisterContainer from './views/RegisterContainer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserPhase } from './enums/Entrance';
// redux react
import { connect } from 'react-redux';
// init antd
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './config/styles/App.less';
import { UserState } from './stores/userState';
moment.locale('zh-cn');

interface IProps {
  phase?: UserPhase;
}

class App extends React.Component<IProps, {}> {
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
                  switch (this.props.phase) {
                    case UserPhase.PHASE_I:
                      return <LoginContainer />;
                    case UserPhase.PHASE_II:
                      return <Redirect to={{ pathname: "/register", state: { from: location } }} />
                    default:
                      return <Redirect to={{ pathname: "/", state: { from: location } }} />
                  }
                }
              }
            />
            <Route
              exact={true}
              path="/register"
              render={
                ({ location }) => {
                  switch (this.props.phase) {
                    case UserPhase.PHASE_I:
                      return <RegisterContainer step={UserPhase.PHASE_I} />
                    case UserPhase.PHASE_II:
                      return <RegisterContainer step={UserPhase.PHASE_II} />
                    default:
                      return <Redirect to={{ pathname: "/", state: { from: location } }} />
                  }
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

const mapStateToProps = (state: UserState, ownProps: IProps) => {
  return {
    // phase: user login or register progress.
    phase: state.userPhase,
    ...ownProps
  }
}

export default connect(mapStateToProps)(App);
