import * as React from 'react';
import { Typography, Space, Divider, Form, Input, Button, Checkbox, Tabs } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, PhoneOutlined, NumberOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

import styles from '../static/styles/loginLayout.module.css'

const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;

interface IState {
  login: {
    type: string
  }
}

class Login extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.onFinish.bind(this);
    this.onTabChange.bind(this);
    this.state = {
      login: {
        type: "email"
      }
    }
  }

  onFinish(values: Store) {
    console.log('Received values of form: ', values);
  }

  onTabChange(key: string) {
    this.setState({
      login: {
        type: key
      }
    })
  }

  render() {
    const contentList =
    {
      email: (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>保持登录</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>

          <Text>登录遇到了问题？</Text>
          <Link href="https://ant.design" target="_blank">
            找回密码
          </Link>

          <Divider plain>
            通过第三方平台
          </Divider>

          <Form.Item>
            <Button icon={<GoogleOutlined />} size="large" type="primary" htmlType="submit" block>
              使用 Google 登录
            </Button>
          </Form.Item>
        </Form>
      ),
      phone: (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" prefix={<PhoneOutlined />} placeholder="手机号码" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              size="large"
              prefix={<NumberOutlined />}
              type="text"
              placeholder="短信验证码"
              addonAfter={
                <Button type="text" htmlType="submit">
                  获取验证码
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>保持登录</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>

          <Divider plain>
            通过第三方平台
          </Divider>

          <Form.Item>
            <Button icon={<GoogleOutlined />} size="large" type="primary" htmlType="submit" block>
              使用 Google 登录
            </Button>
          </Form.Item>
        </Form>
      )
    }

    return (
      <Space direction="vertical" style={{ width: "100%" }}>

        <div className={styles.center} style={{ "paddingBottom": "48px" }}>
          <Title>登录</Title>
          <Text>没有账户？ 马上</Text>
          <Link href="https://ant.design" target="_blank">
            注册
          </Link>
        </div>

        <Tabs defaultActiveKey="phone" onChange={(key) => this.onTabChange(key)}>
          <TabPane tab="邮箱登录" key="email">
            {contentList.email}
          </TabPane>
          <TabPane tab="手机登录" key="phone">
            {contentList.phone}
          </TabPane>
        </Tabs>

      </Space>
    );
  }
}

export default Login;