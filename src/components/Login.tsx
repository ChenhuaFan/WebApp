import * as React from 'react';
import { Typography, Space, Divider, Form, Input, Button, Checkbox, Tabs, Select } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, PhoneOutlined, NumberOutlined, WechatOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import EntranceEnums from "../enums/Entrance";

const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { PHONE_REGS, TIME } = EntranceEnums;

// interfaces
interface IProps {
  verifierId: string,
  onGetCaptcha: (phone: string) => void,
  onLoginViaEmail: (values: Store) => void,
  onLoginViaPhone: (values: Store) => void,
  onLoginViaGoogle: () => void
}
interface IState {
  type: string,
  validPhone: boolean,
  captchBtnClicked: boolean,
  area: string,
  phone: string,
  counter: number
}
interface Login {
  captchaTimer?: NodeJS.Timeout
}

class Login extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      type: "phone",
      validPhone: false,
      captchBtnClicked: false,
      area: "1",
      phone: "",
      counter: TIME
    }
    this.captchaTimer = undefined;
  }

  private onTabChange(key: string): void {
    this.setState({ "type": key });
  }

  private verifyPhone(area: string, phone: string): boolean {
    return PHONE_REGS[area].test(phone)
  }

  private onPhoneChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // update phone;
    const val = event.target.value;
    this.setState({ "phone": val, "validPhone": this.verifyPhone(this.state.area, val) });
  }

  private onAreaChange(value: string): void {
    // update area;
    this.setState({ "area": value }, () => {
      this.setState({ "validPhone": this.verifyPhone(this.state.area, this.state.phone) });
    });
  }

  private onClickGetCaptcha(): void {
    this.setState({ "captchBtnClicked": true });
    // set timer for TIME s
    this.captchaTimer = setInterval(() => {
      if (this.state.counter < 1) {
        this.setState({ "counter": TIME, "captchBtnClicked": false });
        if (this.captchaTimer) clearInterval(this.captchaTimer);
      }
      this.setState({ "counter": this.state.counter - 1 });
      console.log(!(this.state.validPhone && !this.state.captchBtnClicked));
    }, 1000);
    this.props.onGetCaptcha(`+${this.state.area}${this.state.phone}`);
  }

  public render() {

    const selectBefore = (
      <Select
        defaultValue={this.state.area}
        className="select-before"
        onChange={(v) => this.onAreaChange(v)}
      >
        <Option value="86"><span role="img" aria-label="中国">🇨🇳</span> 86</Option>
        <Option value="1"><span role="img" aria-label="United States">🇺🇸</span> 1</Option>
      </Select>
    );
    const contentList =
    {
      email: (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.props.onLoginViaEmail}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入您的邮箱' },
              {}
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} type="email" placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入您的密码' }]}
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
        </Form>
      ),
      phone: (
        <div>
          <Input
            size="large"
            prefix={<PhoneOutlined />}
            addonBefore={selectBefore}
            value={this.state.phone}
            onChange={(e) => this.onPhoneChange(e)}
            placeholder="手机号码"
            autoComplete="off"
            type="number"
            style={{ "paddingBottom": "24px" }}
          />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.props.onLoginViaPhone}
          >
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: '请输入6位验证码' }]}
            >
              <Input
                size="large"
                prefix={<NumberOutlined />}
                maxLength={6}
                type="tel"
                placeholder="6 位短信验证码"
                autoComplete="off"
                addonAfter={
                  <Button type="text"
                    onClick={() => this.onClickGetCaptcha()}
                    disabled={!(this.state.validPhone && !this.state.captchBtnClicked)}
                  >
                    { !this.state.captchBtnClicked ? "获取验证码" : `${this.state.counter} 秒` }
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
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    }

    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ "paddingBottom": "48px" }}>
          <Title>登录</Title>
          <Text>没有账户？ 马上</Text>
          <Link href="https://ant.design" target="_blank">
            注册
          </Link>
        </div>
        <Tabs defaultActiveKey="email" onChange={(key) => this.onTabChange(key)}>
          <TabPane tab="邮箱登录" key="email">
            {contentList.email}
          </TabPane>
          <TabPane tab="手机登录" key="phone">
            {contentList.phone}
          </TabPane>
        </Tabs>
        <Divider plain>
          通过第三方平台
        </Divider>
        <div style={{ "textAlign": "center" }}>
          <Button size="large" type="primary" shape="circle" icon={<GoogleOutlined />} onClick={this.props.onLoginViaGoogle} />
          <Button size="large" type="primary" shape="circle" icon={<WechatOutlined />} style={{ "marginLeft": "12px" }} />
        </div>
      </Space>
    );
  }
}

export default Login;