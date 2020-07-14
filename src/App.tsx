import React from 'react';
import LoginContainer from './containers/LoginLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// init antd
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './config/styles/App.less';

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={() => <p>主页</p>} />
          <Route exact={true} path="/login" render={() => <LoginContainer />} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
