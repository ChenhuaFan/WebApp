import * as React from 'react';
import { PageHeader, Space, Row, Col, Dropdown, Button, Anchor } from 'antd';
import AvatarUI from './AvatarUI';
import { Routers } from '../enums/Routers';
import NavigationButton from './NavigationButton';
import { BarsOutlined } from '@ant-design/icons';
// import SearchInput from './SearchInput';

class IHeader extends React.Component<{}, {}> {

  public render(): JSX.Element {

    const overlay: JSX.Element = (
      <Space size="large">
        <NavigationButton to={Routers.SUBLEASE_LIST}>转租市场</NavigationButton>
        <NavigationButton to={Routers.ROOMMATE_LIST}>找室友</NavigationButton>
        <NavigationButton to={Routers.WIKI}>房源 WIKI</NavigationButton>
        <AvatarUI />
      </Space>
    )

    return (
      <Anchor
        style={{
          "backgroundColor": "white",
          "boxShadow": "0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1)",
          "borderTop": "3px solid #EB426A"
        }}>
        <PageHeader
          className="site-page-header-responsive"
          backIcon={false}
          title={"RentHouse"}
          extra={
            (
              <Row>
                <Col xs={0} sm={0} md={12} lg={12} xl={12}>
                  {overlay}
                </Col>
                <Col xs={12} sm={12} md={0} lg={0} xl={0}>
                  <Dropdown overlay={overlay} placement="bottomRight" arrow>
                    <Button icon={<BarsOutlined />} type='primary'>导航</Button>
                  </Dropdown>
                </Col>
              </Row>
            )
          }
        >
        </PageHeader>
      </Anchor>

    )
  }

}

export default IHeader;