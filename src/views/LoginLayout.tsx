import * as React from 'react';
import Login from '../components/Login';
import { Row, Col, message } from 'antd';
import styles from '../static/styles/loginLayout.module.css'
import fb from '../firebase'
import { Store } from 'antd/lib/form/interface';

const { firebase, VERIFIED_ID } = fb;

// interface
// declare global {
//   interface Window {
//     confirmationResult: any;
//   }
// }
interface LoginContainer {
  confirmationResult?: firebase.auth.ConfirmationResult;
}

class LoginContainer extends React.Component<{}, {}> {

  public constructor(props: {}) {
    super(props);
    this.confirmationResult = undefined;
  }

  private onLoginViaEmail(values: Store): void {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(error => {
      // TODO: Handle Errors here.
      message.error(`邮箱或密码错误`, 5);
    });
  }

  private onGetCaptcha(phone: string): void {
    // init phone verifier
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(VERIFIED_ID, {
      'size': 'invisible',
      'callback': function (response: any) {
        console.log(response);
        message.success(`人机检测通过，短信已发送`);
      }
    });
    firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((confirmationResult: firebase.auth.ConfirmationResult) => {
        this.confirmationResult = confirmationResult;
      }).catch(error => {
        // TODO: Handle Error; SMS not sent
        message.error(`短信发送失败`, 5);
      });
  }

  private onLoginViaPhone(values: Store): void {
    if (this.confirmationResult) {
      this.confirmationResult.confirm(values.captcha).catch((error: any) => {
        // TODO: User couldn't sign in (bad verification code?)
        message.error(`验证码错误`, 5);
      });
      return;
    }
    // TODO: error: confirmationResult is undefined.
    message.error(`未通过人机检测 `, 5);
  }

  private onLoginViaGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).catch(error => {
      // Handle Errors here.
        message.error(`Google 登录失败`, 5);
    });
  }

  public render() {
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8} className={styles.wrapper}>
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