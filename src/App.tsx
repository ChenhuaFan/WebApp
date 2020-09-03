// react
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserPhase } from './enums/Entrance';
import { Routers } from './enums/Routers';
// components
import LoginContainer from './views/LoginContainer';
import RegisterContainer from './views/RegisterContainer';
import Home from './views/Home';
// redux react
import { connect } from 'react-redux';
// init antd
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './config/styles/App.less';
import { UserState } from './stores/userState';
import Post from './views/Post';
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
              path={Routers.LOGIN}
              render={
                ({ location }) => {
                  switch (this.props.phase) {
                    case UserPhase.PHASE_I:
                      return <LoginContainer />;
                    case UserPhase.PHASE_II:
                      return <Redirect to={{ pathname: Routers.REGISTER, state: { from: location } }} />
                    default:
                      return <Redirect to={{ pathname: Routers.HOME, state: { from: location } }} />
                  }
                }
              }
            />
            <Route
              exact={true}
              path={Routers.REGISTER}
              render={
                ({ location }) => {
                  switch (this.props.phase) {
                    case UserPhase.PHASE_I:
                      return <RegisterContainer step={UserPhase.PHASE_I} />
                    case UserPhase.PHASE_II:
                      return <RegisterContainer step={UserPhase.PHASE_II} />
                    default:
                      return <Redirect to={{ pathname: Routers.HOME, state: { from: location } }} />
                  }
                }
              }
            />
            <Route exact={true} path={Routers.POST} render={() => <Post />} />
            <Route exact={true} path={Routers.HOME} render={() => <Home />} />
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
