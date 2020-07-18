import * as React from 'react';
import { Typography, Space, Divider, Form, Input, Button, Checkbox, Tabs, Select } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, PhoneOutlined, NumberOutlined, WechatOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import EntranceEnums from "../enums/Entrance";

const { Text, Link } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { PHONE_REGS, TIME } = EntranceEnums;

// interfaces
interface IProps {
  title: JSX.Element,
  isLogin: boolean,
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
interface FirebaseAuthUI {
  captchaTimer?: NodeJS.Timeout
}
interface JSXMap {
  [propName: string]: JSX.Element;
}

class FirebaseAuthUI extends React.Component<IProps, IState> {

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

    const selectBefore: JSX.Element = (
      <Select
        defaultValue={this.state.area}
        className="select-before"
        onChange={(v) => this.onAreaChange(v)}
      >
        <Option value="86"><span role="img" aria-label="中国">🇨🇳</span> 86</Option>
        <Option value="1"><span role="img" aria-label="United States">🇺🇸</span> 1</Option>
      </Select>
    ),
      buttonText: string = this.props.isLogin ? "登录" : "注册",
      findPassWord: JSX.Element | string = this.props.isLogin ? (
        <div className="findPW">
          <Text>{buttonText}遇到了问题？</Text>
          <Link href="https://ant.design" target="_blank">
            找回密码
          </Link>
        </div>
      ) : "",
      pravicy: JSX.Element | string = !this.props.isLogin ? (
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject('您需要同意我们的隐私权政策') },
          ]}
        >
          <Checkbox>
            同意 RentHouse <a href="/">隐私权政策</a>
          </Checkbox>
        </Form.Item>
      ) : "",
      contentList: JSXMap = {
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
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>
            {pravicy}
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                {buttonText}
              </Button>
            </Form.Item>
            {findPassWord}
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
                      {!this.state.captchBtnClicked ? "获取验证码" : `${this.state.counter} 秒`}
                    </Button>
                  }
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
              </Form.Item>
              {pravicy}
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  {buttonText}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
      }

    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ "paddingBottom": "48px" }}>
          {this.props.title}
        </div>
        <Tabs defaultActiveKey="email" onChange={(key) => this.onTabChange(key)}>
          <TabPane tab={`邮箱${buttonText}`} key="email">
            {contentList.email}
          </TabPane>
          <TabPane tab={`手机${buttonText}`} key="phone">
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

export default FirebaseAuthUI;