import * as React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserCard: React.FunctionComponent = props => {

  // const size = 

  return (
    <div>
      <div className="avatar" style={{ float: "left", position: "relative", top: "6px" }}>
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
      <div className="userInfo" style={{ paddingLeft: "50px" }}>
        <Title level={4} style={{ margin: "0" }}>Chenhua Fan</Title>
        {props.children}
      </div>
    </div>
  )
}

export default UserCard;