import * as React from 'react';
import Header from '../components/Header';
import BodyLayout from '../components/Layout/Body';
import FullWidthLayout from '../components/Layout/FullWidth';
import PhotoWall from '../components/PhotoWall';
import { Typography, Tag, Row, Col, Card, Divider, Button, Space, Affix, List, Alert } from 'antd';
import { LinkOutlined, HomeOutlined, HeartOutlined, PhoneOutlined, TableOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import InPageNavigation from '../components/InPageNavigation';
import UserCard from '../components/UserCard';
const { Title, Link, Text, Paragraph } = Typography;

interface UserCardItem {
	name: string,
	descript: string
}

class Post extends React.Component<{}, {}> {

	public render(): JSX.Element {
		return (
			<div>
				<Header />
				<FullWidthLayout>
					<PhotoWall
						photos={[
							"../static/imgs/post/1.jpg",
							"../static/imgs/post/2.jpg",
						]}
					/>
				</FullWidthLayout>
				<BodyLayout>
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24} lg={16} xl={16}>
							<InPageNavigation list={[
								{ to: "#", value: "转租" },
								{ to: "#description", value: "描述" },
								{ to: "#address", value: "位置" },
								{ to: "#photos", value: "照片" },
								{ to: "#tenants", value: "现有住户" },
								{ to: "#requirements", value: "要求" }
							]} />
							<Divider />
							<Title level={1}>CityPark, 2B2B</Title>
							<Title level={4} type="secondary"><HomeOutlined /> 1247 W 30th St., LA, CA, USA</Title>
							<Tag>性价比</Tag>
							<Tag>品质之选</Tag>
							<Link><LinkOutlined /> 在Wiki中查看此房源印象</Link>
							<Divider />
							<Space direction="vertical" size="large">
								<UserCard>
									<Text type="secondary"><ClockCircleOutlined /> 1 周前发布  <EyeOutlined /> 1,224 浏览 <HeartOutlined /> 5 收藏</Text>
								</UserCard>
								<Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
									Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
									Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
									a design language for background applications, is refined by Ant UED Team. Ant Design, a
									design language for background applications, is refined by Ant UED Team. Ant Design, a design
									language for background applications, is refined by Ant UED Team. Ant Design, a design
									language for background applications, is refined by Ant UED Team.
    					</Paragraph>
							</Space>
							<Divider />
							<Title level={2}>位置</Title>
							<Text><HomeOutlined /> 1247 W 30th St.</Text>
							<Divider />
							<Title level={2}>照片</Title>
							<Divider />
							<Title level={2}>现有住户</Title>
							<List
								grid={{
									gutter: 16,
									xs: 1,
									sm: 1,
									md: 2,
									lg: 2,
									xl: 2,
									xxl: 4,
								}}
								dataSource={[
									{
										name: "Chenhua Fan",
										descript: "USC ECE MS 在读"
									},
									{
										name: "Chenhua Fan",
										descript: "USC ECE MS 在读"
									},
									{
										name: "Chenhua Fan",
										descript: "USC ECE MS 在读"
									},
									{
										name: "Chenhua Fan",
										descript: "USC ECE MS 在读"
									}
								]}
								renderItem={(item: UserCardItem) => (
									<List.Item>
										<UserCard>
											<Text type="secondary">{item.descript}</Text>
										</UserCard>
									</List.Item>
								)}
							/>,
							<Divider />
							<Title level={2}>要求</Title>
							<Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
								Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
								Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
								a design language for background applications, is refined by Ant UED Team. Ant Design, a
								design language for background applications, is refined by Ant UED Team. Ant Design, a design
								language for background applications, is refined by Ant UED Team. Ant Design, a design
								language for background applications, is refined by Ant UED Team.
    					</Paragraph>
							<Divider />
							<Alert
								message="感兴趣吗？"
								description="收藏 或者 与发布者取得联系！"
								type="info"
								showIcon
							/>
						</Col>
						<Col xs={0} sm={0} md={0} lg={8} xl={8}>
							<Affix offsetTop={100}>
								<Space direction="vertical" size="small" style={{ width: "100%" }}>
									<Card>
										<Title>$1250</Title>
										<Text type="secondary">发布者的预估房价</Text>
										<Divider />
										<Title level={4}>亮点</Title>
										<Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} style={{ maxHeight: "150px", overflow: "scroll" }}>
											Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
											Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
											a design language for background applications, is refined by Ant UED Team. Ant Design, a
											design language for background applications, is refined by Ant UED Team. Ant Design, a design
											language for background applications, is refined by Ant UED Team. Ant Design, a design
											language for background applications, is refined by Ant UED Team.
    								</Paragraph>
									</Card>
									<Button type="primary" block icon={<HeartOutlined />}>收藏</Button>
									<Button type="dashed" block icon={<PhoneOutlined />}>联系我</Button>
									<Button type="dashed" block icon={<TableOutlined />}>预约看房</Button>
								</Space>
							</Affix>
						</Col>
						<Col xs={24} sm={24} md={24} lg={0} xl={0} style={{
							position: "fixed",
							bottom: "0px",
							right: "8px",
							background: "white",
							boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1)",
						}}>
							<Space align="center" size="large" style={{ padding: "2rem 1rem" }}>
								<Text type="secondary">预估房价: <span style={{ color: "darkgreen", fontWeight: "bold" }}>$1250</span></Text>
								<Button type="primary" style={{ float: "right" }}>收藏</Button>
								<Button type="text" style={{ float: "right" }}>联系</Button>
							</Space>
						</Col>
					</Row>
					<br />
				</BodyLayout>
				<div className="footer" style={{ width: "100%", height: '200px', background: "darkgray" }}>

				</div>
			</div>
		)
	}

}

export default Post;