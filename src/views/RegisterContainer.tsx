// app
import React from "react";
import styles from '../static/styles/loginLayout.module.css'
import { RouteProps } from "react-router-dom";
import { UserPhase } from '../enums/Entrance';
// components
import SetUserInfo from "../components/SetUserInfo";
import FirebaseAuth from '../components/FirebaseAuth';
// antd
import { Row, Col, Typography } from 'antd';
import { IdcardTwoTone } from '@ant-design/icons';
const { Title, Text, Link } = Typography;

// extends RouteProps with custom properties.
interface IRouterProps extends RouteProps {
  step: number
}

interface RegisterLayout {
  test: string
}

class RegisterLayout extends React.Component<IRouterProps, {}> {
  constructor(props: IRouterProps) {
    super(props);
    this.test = "abc";
  }

  public render() {
    // step: 1 => register via firebase. step: 2 => register our own user module.
    let content: JSX.Element;
    switch (this.props.step) {
      case UserPhase.PHASE_I:
        content = (
          <FirebaseAuth
            title={
              <div style={{ "textAlign": "center" }}>
                <Title><IdcardTwoTone twoToneColor="#eb2f96" rotate={-15} style={{ "paddingRight": "12px" }} />让我们开始吧</Title>
                <Text>已是 RentHouse 用户？</Text>
                <Link href="/login">登录</Link>
              </div>
            }
            isLogin={false}
          />
        )
        break;
      case UserPhase.PHASE_II:
        content = (
          <div>
            <div style={{ "textAlign": "center" }}>
              <Title><IdcardTwoTone twoToneColor="#eb2f96" rotate={-15} style={{ "paddingRight": "12px" }} />还差一步！</Title>
              <Text>个性化您的信息</Text>
            </div>
            <br />
            <SetUserInfo />
          </div>
        )
        break;
      default:
        content = <p>Error!</p>
    }

    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} className={styles.wrapper}>
          {content}
        </Col>
      </Row>
    );
  }
}

export default RegisterLayout;