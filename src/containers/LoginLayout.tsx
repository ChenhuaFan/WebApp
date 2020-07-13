import * as React from 'react';
import Login from '../components/Login';
import { Row, Col } from 'antd';

import styles from '../static/styles/loginLayout.module.css'
console.log(styles);

interface IProps {

}

class LoginContainer extends React.Component<IProps, {}> {
//
  public render() {
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={8} lg={6} className={styles.wrapper}>
          <Login></Login>
        </Col>
      </Row>
    );
  }
}

export default LoginContainer;