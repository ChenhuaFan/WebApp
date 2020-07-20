import * as React from 'react';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { UserState } from '../stores/userState';
import { UserPhase } from '../enums/Entrance';
import NavigationButton from './NavigationButton';
import { Routers } from '../enums/Routers';

interface IProps {
  phase: UserPhase,
  photo: string,
  displayName: string
}

class AvatarUI extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    switch (this.props.phase) {
      case UserPhase.PHASE_I:
        return (
          <NavigationButton to={Routers.LOGIN} type="primary">登录</NavigationButton>
        )
      case UserPhase.PHASE_II:
        return (
          <NavigationButton to={Routers.REGISTER} type="primary">完成注册</NavigationButton>
        )
      default:
        return (
          <div>
            <Avatar src={this.props.photo}></Avatar>
            <span>{this.props.displayName}</span>
          </div>
        )
    }
  }

}

const mapStateToProps = (state: UserState) => {
  return {
    phase: state.userPhase,
    photo: String(state.fbUser?.photoURL),
    displayName: String(state.fbUser?.displayName)
  }
}

export default connect(mapStateToProps)(AvatarUI);