// react
import * as React from 'react';
// components
import SetUserInfoUI from './SetUserInfoUI';
import { Store } from 'antd/lib/form/interface';
// firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import { message } from 'antd';


class SetUserInfo extends React.Component<{}, {}> {

	public onUpdateUser(values: Store): void {
		let user = firebase.auth().currentUser;
		if (user) {
			user.updateProfile({
				displayName: `${values.lastname} ${values.firstname}`,
				photoURL: "/static/imgs/avators/default.png",
			})
				.then(res => {
					sessionStorage.setItem("userInfo", "true");
					window.location.reload();
					message.success("注册成功");
				})
				.catch(err => {
					message.error(`更新用户数据出错：${err}`);
				})
		}
	}

	public render(): JSX.Element {
		return (
			<SetUserInfoUI onUpdateUserInfo={this.onUpdateUser} />
		)
	}

}

export default SetUserInfo;