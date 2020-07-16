import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Typography, Progress, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import FirebaseAuth from '../components/FirebaseAuth';
import styles from '../static/styles/loginLayout.module.css'

const { Title, Text } = Typography;


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
    const title = (
      <div>
        <Title>S2. 个性化</Title>
        <Space>
          <Text>注册进度</Text><InfoCircleOutlined spin/>
          <Progress percent={80} steps={3} showInfo={false} />
        </Space>
      </div>
    )
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} className={styles.wrapper}>
          <FirebaseAuth
            title={title}
            isLogin={false}
          />
        </Col>
      </Row>
    );
  }
}

export default RegisterLayout;