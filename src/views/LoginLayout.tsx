import * as React from 'react';
import Login from '../components/Login';
import { Row, Col, message } from 'antd';
import styles from '../static/styles/loginLayout.module.css'
import fb from '../firebase'
import { Store } from 'antd/lib/form/interface';

const { firebase, VERIFIED_ID } = fb;

// interface
interface LoginContainer {
  confirmationResult?: firebase.auth.ConfirmationResult;
  recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
}

class LoginContainer extends React.Component<{}, {}> {

  public constructor(props: {}) {
    super(props);
    this.confirmationResult = undefined;
    this.recaptchaVerifier = undefined;
  }

  componentDidMount() {
    // 在挂载时加载人机验证组件
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(VERIFIED_ID, {
      'size': 'invisible',
      'callback': function (response: any) {
        if (response) message.success("验证码已发送");
      }
    });
  }

  private onLoginViaEmail(values: Store): void {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(error => {
      message.error(`邮箱或密码错误`, 5);
    });
  }

  private onGetCaptcha(phone: string): void {
    // init phone verifier
    if (this.recaptchaVerifier) {
      firebase.auth().signInWithPhoneNumber(phone, this.recaptchaVerifier)
        .then((confirmationResult: firebase.auth.ConfirmationResult) => {
          this.confirmationResult = confirmationResult;
        }).catch(error => {
          message.error(`短信发送失败`, 5);
        });
      return;
    }
    message.error(`未通过人机检测`, 5);
  }

  private onLoginViaPhone(values: Store): void {
    if (this.confirmationResult) {
      this.confirmationResult.confirm(values.captcha).catch((error: any) => {
        message.error(`验证码错误`, 5);
      });
      return;
    }
    message.error(`未通过人机检测`, 5);
  }

  private onLoginViaGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).catch(error => {
      message.error(`Google 登录失败`, 5);
    });
  }

  public render() {
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} className={styles.wrapper}>
          <p id={VERIFIED_ID}></p>
          <Login
            verifierId={VERIFIED_ID}
            onGetCaptcha={(phone) => this.onGetCaptcha(phone)}
            onLoginViaEmail={(values: Store) => this.onLoginViaEmail(values)}
            onLoginViaPhone={(values: Store) => this.onLoginViaPhone(values)}
            onLoginViaGoogle={() => this.onLoginViaGoogle()}
          ></Login>
        </Col>
      </Row>
    );
  }
}

export default LoginContainer;