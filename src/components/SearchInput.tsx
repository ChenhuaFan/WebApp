import * as React from 'react';
import { Input, Select, Space, Typography, List } from 'antd';
import NavigationButton from './NavigationButton';
const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;


interface SearchItem {
  postId: number,
  coverImg: string,
  title: string,
  location: string
}
interface IProps {
  data: SearchItem
}
class TestItem extends React.Component<IProps, {}> {

  render() {
    return (
      // <Row align="middle" gutter={12} style={{width: "100%"}}>
      //   <Col span={3}>
      //     <img src={this.props.data.coverImg} alt={this.props.data.title} width="50px"/>
      //   </Col>
      //   <Col span={20}>
      //   </Col>
      // </Row>
      <NavigationButton to={`/post/${this.props.data.postId}`} type="text">
        <Space direction="horizontal">
          <Text strong>{this.props.data.title}</Text>
          <Text type="secondary">{this.props.data.location}</Text>
        </Space>
      </NavigationButton>
    )
  }
}

interface SearchInputProps {
  style?: React.CSSProperties
}

class SearchInput extends React.Component<SearchInputProps, {}> {

  public render(): JSX.Element {

    const selectBefore = (
      <Select defaultValue="location" className="select-before">
        <Option value="location">市场</Option>
        <Option value="house">房源 Wiki</Option>
      </Select>
    );

    const data: Array<SearchItem> = [
      {
        postId: 12340239,
        coverImg: "/static/imgs/posts/#abesdf76ew9sdfd9/coverImg.png",
        title: "CityPark 2B2B",
        location: "1247 W 30th St."
      },
      {
        postId: 12340239,
        coverImg: "/static/imgs/posts/#abesdf76ew9sdfd9/coverImg.png",
        title: "CityPark 3B2B",
        location: "1248 W 30th St."
      },
      {
        postId: 12340239,
        coverImg: "/static/imgs/posts/#abesdf76ew9sdfd9/coverImg.png",
        title: "CityPark 3B3B",
        location: "1249 W 30th St."
      },
      {
        postId: 12340239,
        coverImg: "/static/imgs/posts/#abesdf76ew9sdfd9/coverImg.png",
        title: "CityPark 3B3B",
        location: "1249 W 30th St."
      },
      {
        postId: 12340239,
        coverImg: "/static/imgs/posts/#abesdf76ew9sdfd9/coverImg.png",
        title: "CityPark 3B3B",
        location: "1249 W 30th St.1249 W 30th St.1249 W 30th St.1249 W 30th St."
      }
    ]

    const searchData: JSX.Element | undefined = data.length === 0 ? undefined : (<List
      bordered
      header={`搜索建议`}
      size="small"
      dataSource={data.map(item => <TestItem data={item}></TestItem>)}
      renderItem={(item: JSX.Element) => <List.Item>{item}</List.Item>}
      style={{ position: "absolute", top: "40px", width: "100%", zIndex: 10, background: "white" }}
    />);

    return (

      <div style={{ ...this.props.style }}>
        <Search
          placeholder="发现精彩"
          enterButton="搜索"
          addonBefore={selectBefore}
          size="large"
          onSearch={value => console.log(value)}
        />
        <br />
        {searchData}
      </div>
    )
  }

}

export default SearchInput;