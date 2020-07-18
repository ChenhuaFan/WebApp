import * as React from 'react';
import { Row, Col, Typography } from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
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
      <div style={{"textAlign": "center"}}>
        <Title><IdcardTwoTone twoToneColor="#eb2f96" rotate={-15} style={{"paddingRight": "12px"}}/> 欢迎回来</Title>
        <Text>还没有加入 RentHouse ？</Text>
        <Link href="/register">注册</Link>
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