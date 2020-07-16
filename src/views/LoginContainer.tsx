import * as React from 'react';
import { Row, Col, Typography } from 'antd';
import FirebaseAuth from '../components/FirebaseAuth';
import styles from '../static/styles/loginLayout.module.css'

const { Title, Text, Link } = Typography;

// interface
interface LoginContainer {

}

class LoginContainer extends React.Component<{}, {}> {

  public constructor(props: {}) {
    super(props);
  }

  public render() {
    const title = (
      <div>
        <Title>登录</Title>
        <Text>还没有账号？</Text>
        <Link>注册</Link>
      </div>
    )
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} className={styles.wrapper}>
          <FirebaseAuth
            title={title}
            isLogin={true}
          />
        </Col>
      </Row>
    );
  }
}

export default LoginContainer;