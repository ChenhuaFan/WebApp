import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Typography } from 'antd';
import { IdcardTwoTone } from '@ant-design/icons'; //SmileTwoTone
// import FirebaseAuth from '../components/FirebaseAuth';
import styles from '../static/styles/loginLayout.module.css'
import SetUserInfo from "../components/SetUserInfo";

const { Title } = Typography; //Link


interface RouterProps {
  step: string
}

interface RegisterLayout extends RouteComponentProps<RouterProps> {
  test: string
}

class RegisterLayout extends React.Component<RegisterLayout, {}> {
  constructor(props: RegisterLayout) {
    super(props);
    this.test = "abc";
  }

  public render() {
    // const titleForRegister = (
    //   <div style={{ "textAlign": "center" }}>
    //     <Title><IdcardTwoTone twoToneColor="#eb2f96" rotate={-15} style={{ "paddingRight": "12px" }} />让我们开始吧</Title>
    //     <Text>已是 RentHouse 用户？</Text>
    //     <Link href="/login">登录</Link>
    //   </div>
    // )
    const titleForUserInfo = (
      <div style={{ "textAlign": "center" }}>
        <Title><IdcardTwoTone twoToneColor="#eb2f96" rotate={-15} style={{ "paddingRight": "12px" }} />个性化</Title>
      </div>
    )
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} className={styles.wrapper}>
          {/* <FirebaseAuth
            title={title}
            isLogin={false}
          /> */}
          {titleForUserInfo}
          <br />
          <SetUserInfo />
        </Col>
      </Row>
    );
  }
}

export default RegisterLayout;