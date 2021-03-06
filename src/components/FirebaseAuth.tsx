// app
import * as React from 'react';
import Login from '../components/FirebaseAuthUI';
import { message } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { VERIFIED_ID } from '../enums/Entrance'
// firebase
import * as firebase from "firebase/app";
import "firebase/auth"
// redux
import { rentHouseStore } from '../stores';
import { setFirebaseUserAction } from '../actions/userAction';

// interface
interface IProps {
  title: JSX.Element,
  isLogin: boolean
}

interface FireBaseAuth {
  confirmationResult?: firebase.auth.ConfirmationResult;
  recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
}

class FireBaseAuth extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props);
    this.confirmationResult = undefined;
    this.recaptchaVerifier = undefined;
  }

  componentDidMount() {
    // load Repcaptcha verifier.
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(VERIFIED_ID, {
      'size': 'invisible',
      'callback': function (response: any) {
        if (response) message.success("验证码已发送");
      }
    });
  }

  private onLoginViaEmail(values: Store): void {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        if (res.user) {
          message.success(`登录成功：${res.user.displayName}`);
          rentHouseStore.dispatch(setFirebaseUserAction(res.user));
          window.location.reload();
        }
      })
      .catch(error => {
        message.error(`邮箱或密码错误`, 5);
      });
  }

  private onGetCaptcha(phone: string): void {
    // init captcha verifier
    if (this.recaptchaVerifier) {
      firebase.auth().signInWithPhoneNumber(phone, this.recaptchaVerifier)
        .then((confirmationResult: firebase.auth.ConfirmationResult) => {
          this.confirmationResult = confirmationResult;
          message.success(`已通过人机检测`);
        }).catch(error => {
          message.error(`短信发送失败: ${error}`, 5);
        });
      return;
    }
    message.error(`未通过人机检测`, 5);
  }

  private onLoginViaPhone(values: Store): void {
    if (this.confirmationResult) {
      this.confirmationResult.confirm(values.captcha)
        .then(res => {
          if (res.user) {
            message.success(`登录成功：${res.user.displayName}`);
            rentHouseStore.dispatch(setFirebaseUserAction(res.user));
            window.location.reload();
          }
        })
        .catch((error: any) => {
          message.error(`验证码错误: ${error}`, 5);
        });
      return;
    }
    message.error(`未通过人机检测`, 5);
  }

  private onLoginViaGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        if (res.user) {
          message.success(`登录成功：${res.user.displayName}`);
          rentHouseStore.dispatch(setFirebaseUserAction(res.user));
          window.location.reload();
        }
      })
      .catch(error => {
        message.error(`Google 登录失败: ${error}`, 5);
      });
  }

  public render(): JSX.Element {
    return (
      (
        <div>
          <p id={VERIFIED_ID}></p>
          <Login
            title={this.props.title}
            isLogin={this.props.isLogin}
            onGetCaptcha={(phone) => this.onGetCaptcha(phone)}
            onLoginViaEmail={(values: Store) => this.onLoginViaEmail(values)}
            onLoginViaPhone={(values: Store) => this.onLoginViaPhone(values)}
            onLoginViaGoogle={() => this.onLoginViaGoogle()}
          ></Login>
        </div>
      )
    );
  }
}

export default FireBaseAuth;