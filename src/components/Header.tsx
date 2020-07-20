import * as React from 'react';
import { PageHeader, Space } from 'antd';
import AvatarUI from './AvatarUI';
import { Routers } from '../enums/Routers';
import NavigationButton from './NavigationButton';

class IHeader extends React.Component<{}, {}> {

  public render(): JSX.Element {
    return (
      <PageHeader
        className="site-page-header-responsive"
        style={{
          "backgroundColor": "white",
          "boxShadow": "0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1)",
          "borderTop": "3px solid #EB426A"
        }}
        backIcon={false}
        title="RentHouse"
        extra={
          (
            <Space size="large">
              <NavigationButton to={Routers.SUBLEASE_POST}>转租市场</NavigationButton>
              <NavigationButton to={Routers.SHARING_POST}>找室友</NavigationButton>
              <NavigationButton to={Routers.WIKI}>房源 WIKI</NavigationButton>
              <AvatarUI />
            </Space>
          )
        }
      >
      </PageHeader>
    )
  }

}

export default IHeader;