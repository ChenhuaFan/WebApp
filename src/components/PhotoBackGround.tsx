import * as React from 'react';
// import styles from '../static/styles/PhotoBackGround.module.css';
import { Row, Col } from 'antd';

interface IProps {
  // children: JSX.Element
  banner: JSX.Element;
}

class PhotoBackGround extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return (
      <div style={{minHeight: "340px"}}>
        <Row>
          <Col xs={24} sm={24} md={22} lg={24} xl={24}>
            {this.props.banner}
          </Col>
        </Row>
      </div>
    )
  }

}

export default PhotoBackGround;