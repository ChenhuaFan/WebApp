import React from 'react';
import { Form, Input, Button, Radio, DatePicker } from 'antd';
import PhotoUpload from './PhotoUpload';

class SetUserInfo extends React.Component<{}, {}> {

  public render(): JSX.Element {

    interface stringMap {
      [propName: string]: string;
    }
    const initialValues: stringMap = {
      uuid: "123456789ABCDEFG",
      gender: "privacy",
      firstname: "Chenhua",
      lastname: "Fan",
      birthday: "",
      description: "一位 RentHouse 用户",
      role: "user"
    }

    return (
      <>
        <Form
          layout="vertical"
          initialValues={initialValues}
          size={"large"}
        // onFinish={this.props.onLoginViaEmail}
        >
          <Form.Item label="头像" name="avatar">
            <PhotoUpload></PhotoUpload>
          </Form.Item>
          <Form.Item label="RentHouse 通行证" name="uuid">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="性别" name="gender">
            <Radio.Group>
              <Radio.Button value="male">女</Radio.Button>
              <Radio.Button value="female">男</Radio.Button>
              <Radio.Button value="other">其他</Radio.Button>
              <Radio.Button value="privacy">设为隐私</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="名" name="firstname">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="姓" name="lastname">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="生日" name="birthday">
            <DatePicker />
          </Form.Item>
          <Form.Item label="关于您" name="description">
            <Input.TextArea placeholder="一句话让别人了解您" autoSize allowClear />
          </Form.Item>
          <Form.Item label="role" name="role" style={{ "display": "none" }}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            确定
          </Button>
        </Form>
      </>
    )
  }

}

export default SetUserInfo;