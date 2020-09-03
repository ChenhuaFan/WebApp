import * as React from 'react';
import { Row, Col } from 'antd';

type IProps = { }

const BodyLayout: React.FunctionComponent<IProps> = props => {
  return (
    <Row justify="center">
      <Col xs={22} sm={22} md={22} lg={18} xl={16}>
        {props.children}
      </Col>
    </Row>
  )
}

export default BodyLayout;