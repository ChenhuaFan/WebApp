import * as React from 'react';
import Login from '../components/Login';
import { Row, Col } from 'antd';
import styles from '../static/styles/loginLayout.module.css'
import fb from '../config/firebase'
import { Store } from 'antd/lib/form/interface';

const { firebase, VERIFIED_ID } = fb;

// interface
declare global {
  interface Window {
    confirmationResult: any;
  }
}
interface LoginContainer {
  confirmationResult: any;
}

// set firebase user watcher
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.uid);
    // TODO: login phase II.
  } else {
    // User is signed out.
    // TODO: logout phase II.
  }
});

class LoginContainer extends React.Component<{}, {}> {

  public constructor(props: {}) {
    super(props);
    this.confirmationResult = null;
  }

  private onLoginViaEmail(values: Store): void {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(error => {
      // TODO: Handle Errors here.
      console.error(error.code, error.message)
    });
  }

  private onGetCaptcha(phone: string): void {
    // init phone verifier
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(VERIFIED_ID, {
      'size': 'invisible',
      'callback': function (response: any) {
        console.log("已验证");
      }
    });
    firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((confirmationResult: firebase.auth.ConfirmationResult) => {
        this.confirmationResult = confirmationResult;
      }).catch(error => {
        // TODO: Handle Error; SMS not sent
        console.error(error.code, error.message)
      });
  }

  private onLoginViaPhone(values: Store): void {
    this.confirmationResult.confirm(values.captcha).catch((error: any) => {
      // TODO: User couldn't sign in (bad verification code?)
      console.error(error.code, error.message)
    });
  }

  private onLoginViaGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).catch(error => {
      // TODO: Handle Errors here.
      console.error(error.code, error.message)
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