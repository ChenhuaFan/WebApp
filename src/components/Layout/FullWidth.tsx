import * as React from 'react';
import { Row, Col } from 'antd';

type IProps = {}

const FullWidthLayout: React.FunctionComponent<IProps> = props => {
  return (
    <Row>
      <Col span={24}>
        {props.children}
      </Col>
    </Row>
  )
}

export default FullWidthLayout;