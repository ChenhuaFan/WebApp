import React from 'react';
import LoginContainer from './views/LoginContainer';
import RegisterContainer from './views/RegisterContainer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// init antd
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './config/styles/App.less';

moment.locale('zh-cn');

class App extends React.Component<{}, {}> {
  render () {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/login" component={LoginContainer}/>
            <Route exact={true} path="/register/:step" component={RegisterContainer} />
            <Route exact={true} path="/" render={() => <p>主页</p>} />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    );
  }
}

export default App;
