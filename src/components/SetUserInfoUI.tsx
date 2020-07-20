import React from 'react';
import { Form, Input, Button } from 'antd';
import PhotoUpload from './PhotoUpload';
import { Store } from 'antd/lib/form/interface';
import { connect } from 'react-redux';
import { UserState } from '../stores/userState';

interface IProps {
  onUpdateUserInfo: (values: Store) => void;
  uuid?: string
}

class SetUserInfoUI extends React.Component<IProps, {}> {

  public render(): JSX.Element {

    return (
      <>
        <Form
          layout="vertical"
          size={"large"}
          onFinish={this.props.onUpdateUserInfo}
        >
          <Form.Item label="头像" name="avatar">
            <PhotoUpload></PhotoUpload>
          </Form.Item>
          <Form.Item label="RentHouse 通行证" name="uuid">
            <Input disabled={true} placeholder={this.props.uuid} />
          </Form.Item>
          <Form.Item
            label="名"
            name="firstname"
            rules={[
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject('您需要同意我们的隐私权政策') },
            ]}>
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="姓"
            name="lastname"
            rules={[
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject('您需要同意我们的隐私权政策') },
            ]}>
            <Input allowClear />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            确定
          </Button>
        </Form>
      </>
    )
  }

}

const mapStateToProps = (state: UserState, ownProps: IProps) => {
  return {
    uuid: state.uid,
    ...ownProps
  }
}

export default connect(mapStateToProps)(SetUserInfoUI); 